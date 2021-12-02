# [Equilibrium](https://equilibrium.herokuapp.com/)
By Parker Bolick, Nick Frase and Benjamin Rose

## Table of contents
   * [Equilibrium at a glance](#equilibrium-at-a-glance)
   * [Example Usage](#Example-Usage)
   * [Application Architexture](#application-architecture)
   * [Frontend Overview](#Frontend-Overview)
   * [Backend overview](#Backend-Overview)
   * [Styling](#Styling)
   * [Conclusion and Next Steps](#Conclusion-and-Next-Steps)


## Equilibrium At A Glance
Equilibrium is a fullstack app that allows the user to find posts to read, list posts for others to read.


## Example Usage
### Step 1
   * Visit the site
      * ![equilibrium-homepage](https://user-images.githubusercontent.com/8016326/144483962-c0f5a459-537a-4025-9ff6-8a677377e258.png)
### Step 2
   * sign up by clicking the sign up button in the top right corner
      * ![image](https://user-images.githubusercontent.com/8016326/144484125-d921041d-0624-4aba-a1bd-06f1c15dc915.png)
### Step 3
   * Fill out the sign up form completely and click sign up
      * ![image](https://user-images.githubusercontent.com/8016326/144484177-951dabf2-2751-4cc5-8202-12c3fbb793da.png)
### Step 4
   * Click on a post that you would like to read
      * ![image](https://user-images.githubusercontent.com/8016326/144484245-5ed3232b-67b1-486c-ae87-86d0983d70f6.png)
### Step 5 
   * Read the post
      * ![image](https://user-images.githubusercontent.com/8016326/144484356-9b69dfd3-efb3-4d31-b728-21bd00f1aad5.png)

## Application Architecture
As mentioned before, Equilibrium is a fullstack application.
   * Backend Server - Express
   * Database - PostgreSQL
   * Frontend - HTML with AJAX
   * Styling - Custom CSS



## Frontend Overview
### HTML with AJAX
Equilibrium utilized HTML with AJAx for its frontend, making use of fetch calls and dom-manipulation.


## Backend Overview
### Express
The Express server consists of different routes that perform CRUD operations to the database.

### Postgresql 
Postgresql was chosen as the SQL language and is managed by Sequelize.


## Styling

### CSS 
Custom CSS was used for the styling of this project. 
Properties used frequently:
   * Position
      * relative
      * absolute
      * fixed
   * Display
      * flex
      * grid
   * animations and effects

## Conclusion and Next Steps

Equilibrium was a blast to create and I look forward to managing it in the future.
There are some features that I plan on implementing in the future 
   * WebSockets for realtime comments
   * search feature
   * AWS for photo upload
   * Responsive styling



