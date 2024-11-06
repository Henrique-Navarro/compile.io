package api.ide.backend.compiler;

import api.ide.backend.dto.CodeDTO;
import api.ide.backend.enums.Command;
import api.ide.backend.enums.DockerVolumePath;
import api.ide.backend.enums.MainClass;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CompilerService {

    /**
     * Creates a temp file, and runs the code on container
     * The Process with command, invokes container and run code
     *
     * @param codeDTO
     * @param input
     * @return ProcessOutputDTO
     */
    public ProcessOutputDTO compile(CodeDTO codeDTO, String input) {
        try {
            this.writeCodeOnTempFile(codeDTO);

            String[] command = this.getCommandByLanguage(codeDTO, input);

            ProcessBuilder processBuilder = new ProcessBuilder(command);

            Process process = processBuilder.start();

            return this.readProcessOutput(process);

        } catch (Exception e) {
            return new ProcessOutputDTO(-1, e.getMessage());
        }
    }

    /**
     * Write code on `backend/tempfiles`
     *
     * @param codeDTO
     */
    public void writeCodeOnTempFile(CodeDTO codeDTO) {
        Path path = null;

        String userDirTempFiles = DockerVolumePath.USER_DIR.get() + "\\tempfiles";

        if (codeDTO.getLanguage().equals("php")) {
            path = Paths.get(userDirTempFiles, MainClass.PHP.get());
        }
        if (codeDTO.getLanguage().equals("python")) {
            path = Paths.get(userDirTempFiles, MainClass.PYTHON.get());
        }
        if (codeDTO.getLanguage().equals("java")) {
            path = Paths.get(userDirTempFiles, MainClass.JAVA.get());
        }
        if (codeDTO.getLanguage().equals("c")) {
            path = Paths.get(userDirTempFiles, MainClass.C.get());
        }

        String codeLanguage = codeDTO.getCode();

        try {
            Files.write(path, codeLanguage.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Return the entire command for specific programming language
     *
     * @param codeDTO
     * @param input
     * @return String[]
     */
    public String[] getCommandByLanguage(CodeDTO codeDTO, String input) {
        // Obter o comando para execução
        String[] command = new String[0];

        if (codeDTO.getLanguage().equals("php")) {
            command = Command.PHP.injectInputIntoDockerCommand(input);
        }
        if (codeDTO.getLanguage().equals("python")) {
            command = Command.PYTHON.injectInputIntoDockerCommand(input);
        }
        if (codeDTO.getLanguage().equals("java")) {
            command = Command.JAVA.injectInputIntoDockerCommand(input);
        }
        if (codeDTO.getLanguage().equals("c")) {
            command = Command.C.injectInputIntoDockerCommand(input);
        }

        //for (String commands : command) {System.out.println(commands);}

        return command;
    }

    /**
     * Reads the output / error on execute code
     *
     * @param process
     * @return ProcessOutputDTO
     * @throws Exception
     */
    public ProcessOutputDTO readProcessOutput(Process process) throws Exception {
        StringBuilder output = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        int exitCode = process.waitFor();

        String processOutput = output.toString().replace("usr/src/app", "");

        return new ProcessOutputDTO(exitCode, processOutput);
    }
}
