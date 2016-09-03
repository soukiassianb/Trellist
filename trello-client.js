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
            error:'',
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
    function getMemberInfo(opts, field) {
        Trello.get(
            '/member/me/' + field + '/',
            opts.success,
            function() {console.log("Failed to load member field")}
        )
    }

    function getAvatar(opts) {
        getMemberInfo({
            success:(data) => {
                let url;
                if(data._value == "gravatar") {
                    getMemberInfo({
                        success:(data) => {
                            url = buildAvatarUrl(data._value);
                            opts.success(url);
                        }
                    }, "gravatarHash");
                } else if(data._value == "upload") {
                    getMemberInfo({
                        success:(data) => {
                            url = buildAvatarUrl(data._value);
                            opts.success(url);
                        }
                    }, "uploadedAvatarHash");
                } else {
                    url =  null;
                    opts.success(url);
                }
            }
        }, 'avatarSource');

        function buildAvatarUrl(hash) {
            return "http://trello-avatars.s3.amazonaws.com/"+ hash +"/170.png";
        }
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

    function addCard(opts, cardName, listId) {
        Trello.post(
            '/cards/',
            {
                name: cardName,
                idList: listId
            },
            opts.success,
            function(data) {console.log(data); }
        )
    }

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
      getMemberInfo:getMemberInfo,
      getAvatar:getAvatar,
      addCard:addCard,
    };
    return trelloClient;
})();
