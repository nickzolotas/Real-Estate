package com.backend.models;

import jakarta.persistence.Entity;

@Entity
public class Support extends User {

    private String category;

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}