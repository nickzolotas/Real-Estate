package com.backend.models;

import jakarta.persistence.*;

@Entity
public class Parking extends Listing {
    private int parkingSpots;
    private int heightLimit;
    private int widthLimit;

    public int getParkingSpots() {
        return parkingSpots;
    }

    public void setParkingSpots(int parkingSpots) {
        this.parkingSpots = parkingSpots;
    }

    public int getHeightLimit() {
        return heightLimit;
    }

    public void setHeightLimit(int heightLimit) {
        this.heightLimit = heightLimit;
    }

    public int getWidthLimit() {
        return widthLimit;
    }

    public void setWidthLimit(int widthLimit) {
        this.widthLimit = widthLimit;
    }
}