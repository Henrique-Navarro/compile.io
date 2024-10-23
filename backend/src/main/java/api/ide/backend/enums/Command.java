package api.ide.backend.enums;

import java.util.Arrays;

public enum Command {
    /* Exemplos:
         Imagem + comando da linguagem + nome da classe
        - PHP: docker run --rm -v <volume> compilador_php php Main.php <input>
        - JAVA: docker run --rm -v <volume> compilador_java javac Main.java <input>
        - PYTHON: docker run --rm -v <volume> compilador_python python Main.py <input>
        - C: docker run --rm -v <volume> compilador_c gcc Main.c -o <input>
    */


    PHP(
            Image.PHP.get(),
            CommandCompile.PHP.get(),
            MainClass.PHP.get()
    ),
    JAVA(
            Image.JAVA.get(),
            CommandCompile.JAVA.get(),
            MainClass.JAVA.get()
    ),
    PYTHON(
            Image.PYTHON.get(),
            CommandCompile.PYTHON.get(),
            MainClass.PYTHON.get()
    ),
    C(
            Image.C.get(),
            CommandCompile.C.get(),
            MainClass.C.get()
    );

    private final String dockerImage;
    private final String[] command;

    Command(String dockerImage, String... command) {
        this.dockerImage = dockerImage;
        this.command = command;
    }

    public String[] injectInputIntoDockerCommand(String input) {
        String[] baseCommand = buildDockerCommand();

        String[] commandWithInput = Arrays.copyOf(baseCommand, baseCommand.length + 1);
        commandWithInput[commandWithInput.length - 1] = input;

        return commandWithInput;
    }

    /**
     * docker run --rm -v volumePath compilador_php(php:7.4-cli) php Main.php
     * docker run --rm -v volumePath openjdk:11 javac Main.java
     * docker run --rm -v volumePath python:3.9 python Main.py
     * docker run --rm -v volumePath gcc gcc main.c -o main
     */
    public String[] buildDockerCommand() {
        String volumePath = DockerVolumePath.USER_DIR.get() + DockerVolumePath.APP_PATH.get();
        String languageCommand = command[0];
        String mainFile = command[1];

        return new String[]{
                "docker",           // Chama o executável Docker, que inicia a execução do container.
                "run",              // Inicia um novo container a partir da imagem especificada.
                "--rm",             // Remove o container automaticamente após a execução para evitar acúmulo de containers inativos.
                "-v",               // Monta um volume, ou seja, mapeia um diretório do host (máquina local) dentro do container.
                volumePath,         // O caminho no sistema host que será montado dentro do container (diretório onde está o código do usuário).
                dockerImage,        // A imagem Docker que será usada (exemplo: "php:7.4-cli", "openjdk:11", etc.).
                languageCommand,    // O comando específico da linguagem a ser executado dentro do container (exemplo: "php", "javac", "python").
                mainFile            // O arquivo principal de código que será executado (exemplo: "Main.php", "Main.java").
        };
    }
}
