package com.backend.models;

import jakarta.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String urlImg;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    private Listing listing;
}