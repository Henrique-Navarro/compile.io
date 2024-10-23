package api.ide.backend.model;

import api.ide.backend.correction.dto.Code;

public class CodeSafetyChecker {

    public static boolean isCodeSafe(Code code) {
        return !containsMaliciousPatterns(code) && !containsUnsafeFunctions(code);
    }

    private static boolean containsMaliciousPatterns(Code code) {
        String codeString = code.getCode();

        // Padrões que podem permitir a execução de código arbitrário
        String[] maliciousPatterns = {
                "eval(",        // Executa código PHP contido em uma string
                "exec(",        // Executa um comando externo
                "shell_exec(",  // Executa um comando do shell e retorna a saída
                "system(",      // Executa um comando e imprime a saída
                "passthru(",    // Executa um comando e imprime a saída bruta
                "assert(",      // Executa uma string como código PHP
                "create_function(", // Cria uma função a partir de uma string, pode ser inseguro
                "preg_replace('/e/',", // Usado para avaliação de expressões regulares, pode executar código
                "include(",     // Inclui e avalia o arquivo especificado, pode ser usado para injeção
                "require(",     // Semelhante a include, mas gera erro fatal se o arquivo não for encontrado
                "include_once(", // Semelhante a include, mas garante que o arquivo seja incluído apenas uma vez
                "require_once(", // Semelhante a require, mas garante que o arquivo seja incluído apenas uma vez
                "popen(",       // Abre um pipe para um comando externo
                "proc_open("    // Inicia um processo com pipes de entrada e saída
        };

        for (String pattern : maliciousPatterns) {
            if (codeString.contains(pattern)) {
                return true;
            }
        }
        return false;
    }

    private static boolean containsUnsafeFunctions(Code code) {
        String codeString = code.getCode();

        // Funções que podem modificar ou acessar o sistema de arquivos de forma insegura
        String[] unsafeFunctions = {
                "unlink(",      // Remove um arquivo, pode causar perda de dados
                "rmdir(",       // Remove um diretório, pode causar perda de dados
                "fopen(",       // Abre um arquivo, pode ser usado para ler ou escrever em arquivos não seguros
                "fwrite(",      // Grava em um arquivo, pode sobrescrever dados
                "fread(",       // Lê dados de um arquivo, pode ser usado de forma insegura
                "file_get_contents(", // Lê o conteúdo de um arquivo, pode ser usado para acessar arquivos sensíveis
                "file_put_contents(", // Grava dados em um arquivo, pode causar sobreposição de dados
                "chown(",       // Altera o proprietário de um arquivo, pode causar problemas de segurança
                "chmod(",       // Altera permissões de arquivo, pode expor arquivos sensíveis
                "exec(",        // Executa um comando do sistema, pode causar execução de código arbitrário
                "shell_exec(",  // Semelhante ao exec, mas retorna a saída do comando
                "system(",      // Executa um comando e imprime a saída, pode ser usado para injeção de comandos
                "passthru(",    // Executa um comando e imprime a saída bruta, pode ser perigoso
                "proc_open("    // Inicia um processo com pipes, pode levar a vulnerabilidades de segurança
        };

        for (String function : unsafeFunctions) {
            if (codeString.contains(function)) {
                return true;
            }
        }
        return false;
    }

}
