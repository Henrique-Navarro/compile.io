package api.ide.backend.compiler;

import java.nio.file.Path;
import java.nio.file.Paths;

public enum Language {
    PHP("php", "image_php", "php", "Main.php"),
    JAVA("java", "image_java", "javac", "Main.java"),
    PYTHON("python", "image_python", "python", "Main.py"),
    C("c", "image_c", "gcc main.c -o main", "main.c"),
    JAVASCRIPT("javascript", "image_js", "node", "Main.js");

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
}
