package com.shortener.url.service;

import com.shortener.url.model.URLShortener;
import com.shortener.url.repository.URLShortenerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class URLShortenerService {

    private final URLShortenerRepository repository;

    private static final String BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public StringBuilder toBase62(long value) {
        StringBuilder sb = new StringBuilder();
        while (value > 0) {
            sb.append(BASE62.charAt((int) (value % 62)));
            value /= 62;
        }
        return sb.reverse();
    }

    public long fromBase62(String value) {
        long result = 0;
        for (int i = 0; i < value.length(); i++) {
            result = result * 62 + BASE62.indexOf(value.charAt(i));
        }
        return result;
    }


    public Map<String, Object> generate(URLShortener urlShortener) {
        urlShortener = repository.save(urlShortener);
        StringBuilder encode = toBase62(urlShortener.getSeq());

        while(encode.length() < 5){
            encode.append("=");
        }

        urlShortener.setShorten(encode.toString());
        repository.save(urlShortener);

        System.err.println(urlShortener.toString());

        Map<String, Object> result = new HashMap<>();
        result.put("URL", urlShortener.getShorten());
        return result;
    }

    public String getOriginal(String encoded) {
        encoded = encoded.replaceAll("=", "");
        Long seq = fromBase62(encoded);
        URLShortener urlShortener = repository.findById(seq).get();
        return urlShortener.getOriginal();
    }
}
