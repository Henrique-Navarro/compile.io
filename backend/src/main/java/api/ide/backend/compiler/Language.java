package api.ide.backend.compiler;

import java.nio.file.Path;
import java.nio.file.Paths;

public enum Language {
    PHP("php", "compilador_php", "php", "Main.php"),
    JAVA("java", "compilador_java", "javac", "Main.java"),
    PYTHON("python", "compilador_python", "python", "Main.py"),
    C("c", "compilador_c", "gcc main.c -o main", "main.c");

    private final String name;
    private final String dockerImage;
    private final String compileCommand;
    private final String mainFile;

    Language(String name, String dockerImage, String compileCommand, String mainFile) {
        this.name = name;
        this.dockerImage = dockerImage;
        this.compileCommand = compileCommand;
        this.mainFile = mainFile;
    }

    public String getName() {
        return name;
    }

    public String getDockerImage() {
        return dockerImage;
    }

    public String getCompileCommand() {
        return compileCommand;
    }

    public String getMainFile() {
        return mainFile;
    }

    public Path getTempFilePath() {
        return Paths.get(FilePath.getTempFilePath(), mainFile);
    }

    public String getVolumePath() {
        return FilePath.getVolumePath();
    }

    public enum FilePath {
        USER_DIR(System.getProperty("user.dir")),
        APP_PATH(":/usr/src/app");

        private final String path;

        FilePath(String path) {
            this.path = path;
        }

        /**
         * espelha o arquivo local para dentro do container
         * local file   :container file
         * C:\Code\tcc\compile.io\backend\tempfiles    :/usr/src/app
         */
        public static String getVolumePath() {
            return USER_DIR.get() + "\\tempfiles" + APP_PATH.get();
        }

        /**
         * retorna o diretório com os arquivos temporários locais
         * C:\Code\tcc\compile.io\backend\tempfiles
         */
        public static String getTempFilePath() {
            return USER_DIR.get() + "\\tempfiles";
        }

        public String get() {
            return path;
        }
    }
}
