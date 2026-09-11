# 18th Birthday Website — Kavya ♡

This is a phone-friendly birthday website made with:
- HTML = structure/content
- CSS = design/animations/responsive layout
- JavaScript = touch interactions, arrow, balloons, slider, envelope, music

NO Java is required.
Python is also not required to run the website.

## How to run it on your laptop

1. Extract this ZIP.
2. Keep `index.html`, `style.css`, `script.js` together.
3. Open `index.html` in Chrome/Edge.
4. For the music and photos, add the files described below into `assets/`.

## Add your music

Put your music file here:

assets/music.mp3

If your file has another name, edit this line in index.html:
<audio id="bgMusic" src="assets/music.mp3" loop preload="auto"></audio>

A phone browser may not allow music to start automatically. The first tap on the website starts it.

## Add your photos

Put these five photos in the assets folder:
photo1.jpg
photo2.jpg
photo3.jpg
photo4.jpg
photo5.jpg

You can use PNG instead; then change the extension in script.js.

The slider supports both:
- tapping the arrows
- swiping left/right on a phone

## Change the messages

The five balloon messages are in index.html. Find:
data-message="..."

Replace those sentences with your own.

The letter is also in index.html inside:
<div class="letter"> ... </div>

The final birthday message is in the section with id="screen6".

## Important

Do not put private information such as phone numbers, addresses, passwords, school IDs, etc. in a public website.

## Publishing later

Once the website is finished, it can be uploaded to a static hosting service such as GitHub Pages or another web host. The folder does not need a Python server for normal use.
