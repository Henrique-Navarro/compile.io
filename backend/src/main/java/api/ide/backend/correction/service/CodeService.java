package api.ide.backend.correction.service;

import api.ide.backend.correction.dto.Code;
import api.ide.backend.enums.Command;
import api.ide.backend.enums.DockerVolumePath;
import api.ide.backend.enums.MainClass;
import api.ide.backend.process.ProcessExecutor;
import api.ide.backend.process.ProcessOutput;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CodeService {

    // fazer p/ várias linguagens

    public ProcessOutput compilar(Code code, String input) {
        try {

            this.writeCodeOnFile(code);

            String[] command = this.getCommandByLanguage(code, input);

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            //processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();


            ProcessExecutor executor = new ProcessExecutor();
            ProcessOutput processOutput = executor.executeProcess(process);

            return processOutput;

        } catch (IOException e) {
            return new ProcessOutput(-1, "Erro de I/O ao compilar o código: " + e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return new ProcessOutput(-1, "Processo foi interrompido: " + e.getMessage());
        } catch (Exception e) {
            return new ProcessOutput(-1, "Erro inesperado: " + e.getMessage());
        }
    }

    public void writeCodeOnFile(Code code) {
        Path path = null;

        if (code.getLanguage().equals("php")) {
            path = Paths.get(DockerVolumePath.USER_DIR.get(), MainClass.PHP.get());
        }
        if (code.getLanguage().equals("python")) {
            path = Paths.get(DockerVolumePath.USER_DIR.get(), MainClass.PYTHON.get());
        }
        if (code.getLanguage().equals("java")) {
            path = Paths.get(DockerVolumePath.USER_DIR.get(), MainClass.JAVA.get());
        }
        if (code.getLanguage().equals("c")) {
            path = Paths.get(DockerVolumePath.USER_DIR.get(), MainClass.C.get());
        }

        String codeLanguage = code.getCode();

        try {
            Files.write(path, codeLanguage.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String[] getCommandByLanguage(Code code, String input) {
        // Obter o comando para execução
        String[] command = new String[0];

        if (code.getLanguage().equals("php")) {
            command = Command.PHP.injectInputIntoDockerCommand(input);
        }
        if (code.getLanguage().equals("python")) {
            command = Command.PYTHON.injectInputIntoDockerCommand(input);
        }
        if (code.getLanguage().equals("java")) {
            command = Command.JAVA.injectInputIntoDockerCommand(input);
        }
        if (code.getLanguage().equals("c")) {
            command = Command.C.injectInputIntoDockerCommand(input);
        }

        for (String commands : command) {
            // System.out.println(commands);
        }

        return command;
    }

    private String executar(String className, String language) {
        try {
            // Construir o comando Docker para executar o código
            String dockerImage = "compilador_" + language;
            String[] command = {"docker", "run", "--rm", "-v", System.getProperty("user.dir") + ":/usr/src/app", dockerImage, "java", "Main"};

            // Executar o comando Docker
            Process process = Runtime.getRuntime().exec(command);

            // Ler a saída da execução do código
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Esperar até que o processo de execução seja concluído
            int exitCode = process.waitFor();

            // Verificar se houve erros durante a execução
            if (exitCode == 0) {
                return output.toString();
            } else {
                // Se houver erros durante a execução, retornar a saída de erro
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
                StringBuilder errorOutput = new StringBuilder();
                String errorLine;
                while ((errorLine = errorReader.readLine()) != null) {
                    errorOutput.append(errorLine).append("\n");
                }
                return "Erro durante a execução:\n" + errorOutput.toString();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Erro ao executar o código.";
        }
    }
}
