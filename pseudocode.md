User stories
1. see [current values]
2. see a character illustration
3. read paragraph (suggestion)
4. press arrow keys for choice
5. mouse click for choice
6. see choice reflected in words (keydown or mousedown)
8. see [adjusted values]
9. when all values pass 100, end game
10. when 1 value drop below 1, end game
11. press key to start again

Flow
[obj] card
    - narrative
    - illustration
    - choiceY
    - choiceN
    - stats adjustment

[function] end-game detection
[function] start screen
[function] end game

[obj] game
    - clear canvas
    - display round number
    - stats
    - while (!end-game && cards) {
    - select a card
    - paint canvas, animate card movein
    - listen for input
    - update
        - adjust value
        - animate card moveout
    }
