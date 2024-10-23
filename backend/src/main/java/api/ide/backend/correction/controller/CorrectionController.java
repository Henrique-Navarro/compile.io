package api.ide.backend.correction.controller;

import api.ide.backend.chatgpt.model.ChatRequest;
import api.ide.backend.chatgpt.model.ChatResponse;
import api.ide.backend.chatgpt.service.ChatGPTService;
import api.ide.backend.correction.dto.Code;
import api.ide.backend.correction.dto.CorrectionDTO;
import api.ide.backend.correction.handler.CorrectionHandler;
import api.ide.backend.correction.service.CodeService;
import api.ide.backend.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class CorrectionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CodeService codeService;

    @Autowired
    private ChatGPTService chatGPTService;

    @Autowired
    private CorrectionHandler handler;
    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    /*@PostMapping("/compilar")
    private ResponseEntity<String> compilar(@RequestBody Code code){
        //return chatGPTService.getFeedback(code.getCode());
        return ResponseEntity.ok(codeService.compilar(code, ""));
    }*/
    @Value("${openai.model}")
    private String model;
    @Value("${openai.api.url}")
    private String apiUrl;

    @PostMapping("/corrigir")
    // Retornar o id de todos os testes
    private ResponseEntity<CorrectionDTO> corrigir(@RequestBody Code code) {
        CorrectionDTO correctionDTO = handler.correct(code);

        // se tiver erro, chama o gpt
        // return ResponseEntity.ok(Reponse)
        return ResponseEntity.ok(correctionDTO);
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        // create a request
        ChatRequest request = new ChatRequest(model, prompt);

        // call the API
        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        // Retornar o valor dentro da tag <CORRECTION_CODE>
        return response.getChoices().getFirst().getMessage().getContent();
    }
}
