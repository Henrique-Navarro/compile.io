package api.ide.backend.compiler;

public enum FilePath {
    USER_DIR(System.getProperty("user.dir")),
    APP_PATH("usr/src/app"),
    TEMP_FILES("\\tempfiles"),
    SEPARATOR(":/"),
    SLASH("/"),
    COLON(":");

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
        return USER_DIR.get() + TEMP_FILES.get() + SEPARATOR.get() + APP_PATH.get();
    }

    /**
     * retorna o diretório com os arquivos temporários locais
     * C:\Code\tcc\compile.io\backend\tempfiles
     */
    public static String getTempFilePath() {
        return USER_DIR.get() + TEMP_FILES.get();
    }

    public static String getFullPathOfMainFileByLanguage(Language language) {
        String file = language.getMainFile();
        return FilePath.APP_PATH.get() + SLASH.get();
    }

    public String get() {
        return path;
    }
}