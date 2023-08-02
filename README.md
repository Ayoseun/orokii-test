# Orokii webapp web-widgets for face scanning and ID scanning
This project was built for [Orokii](https://orokii.com).
A repo for the web widgets for facephi document and face scanning.


### To run the widget 

```
npm init
```

To start it

```
npm start
```


## Deployment


```shell
firebase init
```


- ## select 
- ? Please select an option: Use an existing project
- ? Select a default Firebase project for this directory: osupa-f56dd (osupa)
- i  Using project osupa-f56dd (osupa)

- # Next step 
- ? What do you want to use as your public directory? build
- ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
- ? Set up automatic builds and deploys with GitHub? No
- ? File public/index.html already exists. Overwrite? No
- i  Skipping write of public/index.html

```shell
 firebase deploy --only hosting:orokii
```

```shell
firebase serve 
```