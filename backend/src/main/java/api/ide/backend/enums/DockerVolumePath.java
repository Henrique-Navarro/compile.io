package api.ide.backend.enums;

public enum DockerVolumePath {
    // Volume docker, pega o arquivo no diretório raiz desse projeto
    USER_DIR(System.getProperty("user.dir")),
    APP_PATH(":/usr/src/app");

    private final String path;

    DockerVolumePath(String path) {
        this.path = path;
    }

    public String get() {
        return path;
    }
}