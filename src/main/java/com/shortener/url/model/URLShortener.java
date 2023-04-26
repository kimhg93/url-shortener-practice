package com.shortener.url.model;

import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Entity
public class URLShortener {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long seq;

    @Column
    private String original;

    @Column(columnDefinition = "TEXT")
    private String shorten;

    @Column(columnDefinition = "TEXT")
    private String createDate;

    @PrePersist
    public void prePersist() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
        createDate = sdf.format(new Date());
    }

}
