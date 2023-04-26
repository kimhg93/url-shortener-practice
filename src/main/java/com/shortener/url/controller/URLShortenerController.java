package com.shortener.url.controller;

import com.shortener.url.model.URLShortener;
import com.shortener.url.service.URLShortenerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.ModelAndView;
import reactor.core.publisher.Flux;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequiredArgsConstructor
public class URLShortenerController {

    private final URLShortenerService urlShortenerService;

    @GetMapping(value = {"/index"})
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("url-shortener");
        return mv;
    }

    @GetMapping("/api/{encoded}")
    public ResponseEntity<Void> link(@PathVariable String encoded){
        // base62+"=" 아니면 404
        Pattern pattern = Pattern.compile("[^a-zA-Z0-9=]");
        Matcher matcher = pattern.matcher(encoded);
        if(matcher.find()) return ResponseEntity.notFound().build();

        URI uri = URI.create(urlShortenerService.getOriginal(encoded));
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY).location(uri).build();
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> save(@RequestBody URLShortener urlShortener){
        return ResponseEntity.ok().body(urlShortenerService.generate(urlShortener));
    }

    @GetMapping("/api")
    public Flux<Map> test() {
        String url = "http://localhost:18080/generate";

        Map<String, Object> req = new HashMap<>();
        req.put("original", "https://github.com/kimhg93/url-shortener-practice/blob/master/src/main/java/com/shortener/url/controller/URLShortenerController.java");

        WebClient webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.ACCEPT_CHARSET, StandardCharsets.UTF_8.toString())
                .build();

        Flux<Map> response = webClient.post()
                .body(BodyInserters.fromValue(req))
                .retrieve()
                .bodyToFlux(Map.class);

        response.subscribe(res -> System.err.println(res.toString()));

        return response;
    }

}