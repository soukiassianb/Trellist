window.trelloClient = (function() {
    function Login(opts) {
        Trello.authorize({
            type: 'popup',
            name: 'Trello Client',
            scope: {
              read: 'true',
              write: 'true' },
            expiration: 'never',
            success: opts.authenticationSuccess,
            error: () => {console.log('Oops.')}
        });
    }

    var authenticationSuccess = function() {
        alert('okkkk')
    }
    var authenticationFailure = function() {
        alert('failure')
    }
    function getBoards(opts) {
        Trello.get(
          '/members/me/boards/?filter=open',
          opts.success,
          function() {console.log("Failed to load boards"); }
        );
    }

    function getBoard(opts, boardId) {
        Trello.get(
          '/boards/' + boardId + '/',
          opts.success,
          function() {console.log("Failed to load boards"); }
        );
    }

    function getBoardLabels(boardId) {
        Trello.get(
          '/boards/' + boardId + '/labels',
          loadedLabels,
          function() { console.log("Failed to load labels"); }
        );
    }

    function getBoardLists(opts, boardId) {
        Trello.get(
            '/boards/' + boardId + '/lists/',
            opts.success,
            function() {console.log("Failed to load lists");}
        )
    }

    function getListCards(opts, listId) {
        Trello.get(
            '/lists/' + listId + '/cards/',
            opts.success,
            function() {console.log("Failed to load cards");}
        )
    }

    //
    // var myList = "578faa068d97a2a50944308b";
    // var creationSuccess = function(data) {
    //     console.log('Card created successfully. Data returned:' + JSON.stringify(data));
    // };
    //
    // var newCard = {
    //     name: 'New Test Card',
    //     desc: 'This is the description of our new card.',
    //     // Place this card at the top of our list
    //     idList: myList,
    //     pos: 'top'
    // };
    // Trello.post('/cards/', newCard, creationSuccess);
    // // Trello.put('/cards/[ID]', {name: 'New Test Card'});

    function closeCard(opts, cardId, val) {
        Trello.put(
            '/cards/' + cardId + '/closed?value=' + val,
            opts.success,
            function() {console.log("Failed to close the card");}
        )
    }

    const trelloClient = {
      Login:Login,
      getBoards:getBoards,
      getBoard:getBoard,
      getBoardLabels:getBoardLabels,
      getBoardLists:getBoardLists,
      getListCards:getListCards,
      closeCard:closeCard,
    };
    return trelloClient;
})();
