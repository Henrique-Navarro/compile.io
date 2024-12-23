package api.ide.backend.compiler;

import api.ide.backend.dto.CodeDTO;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

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
            Path file = this.writeCodeOnTempFile(codeDTO);

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
    public Path writeCodeOnTempFile(CodeDTO codeDTO) {
        try {
            Language language = codeDTO.getLanguage();

            Path path = Command.getTempFilePath(language);

            String codeLanguage = codeDTO.getCode();

            return Files.write(path, codeLanguage.getBytes());

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
        Language language = codeDTO.getLanguage();

        String[] command = Command.getCommand(language, input);

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
