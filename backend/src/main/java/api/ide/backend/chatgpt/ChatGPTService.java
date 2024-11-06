package api.ide.backend.chatgpt;

import api.ide.backend.feedback.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ChatGPTService {

    private final WebClient webClient;
    private final String model;
    private final String apiUrl;
    private final String apiKey;

    @Autowired
    public ChatGPTService(
            WebClient.Builder webClientBuilder,
            @Value("${openai.model}") String model,
            @Value("${openai.api.url}") String apiUrl,
            @Value("${openai.api.key}") String apiKey
    ) {
        this.webClient = webClientBuilder
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.model = model;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    public String getFeedback(String prompt) {
        ChatRequest request = new ChatRequest(model, prompt);

        ChatResponse response = webClient.post()
                .uri(apiUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatResponse.class)
                .block();

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return Tags.FEEDBACK.wrap(Tags.NOTHING.getTag());
        }

        return response.getChoices().getFirst().getMessage().getContent();
    }
}


