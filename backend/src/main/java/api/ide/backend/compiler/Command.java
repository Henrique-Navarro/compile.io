package api.ide.backend.compiler;

import java.nio.file.Path;

public class Command {
    public static String[] getCommand(Language language, String input) {
        return buildDockerCommand(language, input);
    }

    public static Path getTempFilePath(Language language) {
        return language.getTempFilePath();
    }

    /**
     * docker run --rm -v <volumePath> compilador_php(php:7.4-cli) php Main.php
     * docker run --rm -v <volumePath> openjdk:11 javac Main.java
     * docker run --rm -v <volumePath> python:3.9 python Main.py
     * docker run --rm -v <volumePath> gcc gcc main.c -o main
     */
    public static String[] buildDockerCommand(Language language, String input) {
        String volumePath = language.getVolumePath();
        String image = language.getDockerImage();
        String compile = language.getCompileCommand();
        String file = language.getMainFile();
        // adicionar timeout
        // timeout 3s docker run --rm user_code_container
        // ou utilizar alguma funçaõ de ProcessBuilder
        return new String[]{
                "docker",                       // Executes the Docker command.
                "run",                          // Runs a new container.
                "--rm",                         // Removes the container after execution.
                "-v",                           // Mounts a volume from the host to the container.
                volumePath,                     // Path on the host system to mount inside the container.
                image,                          // Docker image to use for execution (e.g., "php:7.4-cli").
                compile,                        // The command to run the code (e.g., "php", "javac").
                file,                           // The main file to execute (e.g., "Main.php").
                input                           // The input data passed to the code.
        };
    }
}
