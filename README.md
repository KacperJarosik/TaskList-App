# Poradnik do uruchomienia aplikacji TaskList

## Jak zainstalować aplikację na swoim komputerze?

- Dla ułatwienia całego procesu uruchomienia aplikacji, udostępniony został plik "runTaskList.sh", który jest prostym skryptem, tworzącym w bieżącym katalogu dodatkowy podkatalog o nazwie TaskList i instaluje wszystkie wymagane składniki wymagane do uruchomienia i prawidłowej pracy aplikacji.

#### UWAGA!! Dalsze instrukcje działają prawidłowo na systemach/terminalach, w których składnia jest zgodna z systemami opartymi o UNIX (Linux, macOS)

## LINUX: Praca ze skryptem uruchomieniowym
#### Krok 0.
1. Upewnij się, że masz zainstalowany node.js (jeśli tworzysz strony w html/react to na pewno jet już on u ciebie zainstalowany)
Link do pobrania: https://nodejs.org/en
2. Upewnij się, że masz odpowiednie środowisku Visual Studio / Webstorm itp. 
#### Krok 1. - nadanie odpowiednich uprawnień plikowi wykonywalnemu:

Aby nadać odpowiednie uprawnienia należy skorzystać z polecania wpisywanego w terminalu:

- `chmod +x ./runTaskList.sh`

#### Krok 2. - uruchomienie skryptu:

Jedyne co pozostało do zrobienia to uruchomienie gotowego skryptu, który zrobi całą robotę za nas.

- `./runTaskList.sh`

Po zakończeniu wszystkich operacji zawartych w pliku skryptowym otworzy nam się gotowa i działająca aplikacja.

### WINDOWS / LINUX / INNE:  `Ręczne zainstalowanie oraz skonfigurowanie aplikacji TaskList`

#### Krok 0.
1. Upewnij się, że masz zainstalowany node.js (jeśli tworzysz strony w html/react to na pewno jet już on u ciebie zainstalowany)
Link do pobrania: https://nodejs.org/en
2. Upewnij się, że masz odpowiednie środowisku Visual Studio / Webstorm itp.

#### Krok 1. - sklonowanie repozytorium do bieżącego katalogu:

- `git clone https://github.com/KacperJarosik/TaskList-App.git`

#### Krok 2. - zainstalowanie niezbędnych składników do uruchomienia aplikacji offline:

- `npm install`

#### Krok 3. - zainstalowanie niezbędnych składników do działania aplikacji z połączeniem funkcjonalności bazy danych:

- `npm install firebase`

#### Krok 4. - uruchomienie aplikacji:

*Opcjonalnie w celu zapewnienia lepszej wydajności przed 'npm start' można wpisać 'npm run build'*
- `npm start`

## Jak zacząć korzystać z aplikacji TaskList?

- Aby zacząć korzystać z funkcji aplikacji należy utworzyć lub zalogować się na istniejące konto użytkownika.
- Aplikacja pozwala na:
  - dodawanie kategorii i zadań;
  - edycję kategorii i zadań;
  - usuwanie kategorii i zadań;
  - edycję danych użytkownika;
  - zmianę motywu wyświetlania aplikacji (tryb jasny/ciemny).

### Autorami aplikacji są:
- Kacper Jarosik
- Bartłomiej Kapturowski 
- Kamil Kaźmierczak 
- Aleksandra Pindral 
