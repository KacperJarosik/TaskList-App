#!/bin/bash

# Utwórz katalog o nazwie TaskList
echo "Tworzę katalog o nazwie TaskList..."
if mkdir TaskList; then
    echo "mkdir TaskList zakończone pomyślnie."
else
    echo "Błąd podczas wykonywania mkdir TaskList."
    exit 1
fi

# Przejście do nowo-utworzonego katalogu o nazwie TaksList
cd TaskList/

# Klonowanie repozytorium z aplikacją
if git clone https://github.com/KacperJarosik/TaskList-App.git; then
    echo "git clone zakończone pomyślnie."
else
    echo "Błąd podczas wykonywania git clone."
    exit 1
fi

# Przejście do katalogu z plikami z repozytorium TaskList-App
cd TaskList-App/

# Sprawdź, czy npm jest zainstalowane
if ! command -v npm &> /dev/null
then
    echo "npm nie jest zainstalowane. Proszę zainstalować npm i spróbować ponownie."
    exit 1
fi

# Wykonaj npm install
echo "Wykonuję npm install..."
if npm install; then
    echo "npm install zakończone pomyślnie."
else
    echo "Błąd podczas wykonywania npm install."
    exit 1
fi

# Wykonaj npm install firebase
echo "Wykonuję npm install firebase..."
if npm install firebase; then
    echo "npm install firebase zakończone pomyślnie."
else
    echo "Błąd podczas wykonywania npm install firebase."
    exit 1
fi

# Wykonaj npm start
echo "Wykonuję npm start..."
if npm start; then
    echo "npm start zakończone pomyślnie."
else
    echo "Błąd podczas wykonywania npm start."
    exit 1
fi
