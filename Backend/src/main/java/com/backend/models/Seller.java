package com.backend.models;

import jakarta.persistence.Entity;

@Entity
public class Seller extends Buyer {
    private String taxId;
    private String iBan;
    private Double rating;

    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }

    public String getiBan() { return iBan; }
    public void setiBan(String iBan) { this.iBan = iBan; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
