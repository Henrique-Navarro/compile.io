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
            Language language = codeDTO.getLanguage();
            String code = codeDTO.getCode();

            Path file = this.writeCodeOnTempFile(code, language);

            String[] command = this.getCommandByLanguage(language, input);

            ProcessBuilder processBuilder = new ProcessBuilder(command);

            Process process = processBuilder.start();

            return this.readProcessOutput(process, language);

        } catch (Exception e) {
            return new ProcessOutputDTO(-1, e.getMessage());
        }
    }

    /**
     * Write code on `backend/tempfiles`
     *
     * @param code
     * @param language
     */
    public Path writeCodeOnTempFile(String code, Language language) {
        try {
            Path path = Command.getTempFilePath(language);

            return Files.write(path, code.getBytes());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Return the entire command for specific programming language
     *
     * @param language
     * @param input
     * @return String[]
     */
    public String[] getCommandByLanguage(Language language, String input) {
        String[] command = Command.getCommand(language, input);

        // for (String commands : command) {System.out.println(commands);}

        return command;
    }

    /**
     * Reads the output / error on execute code
     *
     * @param process
     * @return ProcessOutputDTO
     * @throws Exception
     */
    public ProcessOutputDTO readProcessOutput(Process process, Language language) throws Exception {
        StringBuilder output = new StringBuilder();
        StringBuilder errorOutput = new StringBuilder();

        // Combine stdout and stderr
        try (BufferedReader stdOutReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
             BufferedReader stdErrReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {

            String line;
            while ((line = stdOutReader.readLine()) != null) {
                output.append(line).append("\n");
            }

            while ((line = stdErrReader.readLine()) != null) {
                errorOutput.append(line).append("\n");
            }
        }

        int exitCode = process.waitFor();

        String sanitizedOutput = sanitizeOutput(output, errorOutput, language);

        return new ProcessOutputDTO(exitCode, sanitizedOutput);
    }

    /**
     * @param output
     * @param errorOutput
     * @param language
     * @return
     */
    public String sanitizeOutput(StringBuilder output, StringBuilder errorOutput, Language language) {
        String path = FilePath.getFullPathOfMainFileByLanguage(language);

        String processOutput = output.toString().replace(path, "");
        String processErrorOutput = errorOutput.toString().replace(path, "");

        boolean hasErrors = !processErrorOutput.isEmpty();

        return hasErrors ? processErrorOutput : processOutput;
    }
}
