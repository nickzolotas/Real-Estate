package com.backend.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users") // "users" γιατί το "user" είναι δεσμευμένη λέξη στη SQL
@Inheritance(strategy = InheritanceType.JOINED) // Δημιουργεί συνδεδεμένους πίνακες για τις υποκλάσεις
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passHash;
    private char role;
    private String userName;
    private String name;
    private String surname;
    private String email;
    private String phone;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPassHash() { return passHash; }
    public void setPassHash(String passHash) { this.passHash = passHash; }

    public char getRole() { return role; }
    public void setRole(char role) { this.role = role; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Date getBirthday() { return birthday; }
    public void setBirthday(Date birthday) { this.birthday = birthday; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}