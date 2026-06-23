package com.backend.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Enumerated(EnumType.STRING)
    private ListingType listingType;

    private String title;
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int size;
    private String floor;
    private boolean hasElevator;
    private int year;
    private String municipality;
    private String city;
    private String area;
    private String address;
    private String status;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL)
    private List<Image> images;

    public Long getId() { return Id; }
    public void setId(Long id) { this.Id = id; }

    public ListingType getListingType() { return listingType; }
    public void setListingType(ListingType listingType) { this.listingType = listingType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }

    public boolean isHasElevator() { return hasElevator; }
    public void setHasElevator(boolean hasElevator) { this.hasElevator = hasElevator; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getMunicipality() { return municipality; }
    public void setMunicipality(String municipality) { this.municipality = municipality; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<Image> getImages() { return images; }
    public void setImages(List<Image> images) { this.images = images; }
}