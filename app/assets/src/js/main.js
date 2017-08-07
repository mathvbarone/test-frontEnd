var start = {

    // FUNÇÕES
    functions: {
        // FUNÇÃO DE DE RENDERIZAÇÃO DA LISTA
        renderList: function() {
            // PUXANDO AS INFORMAÇÕES DO ARQUIVO USERS.JSON

            //DECLARANDO AS VARIÁVEIS
            var usersArr = [];
            var request = new XMLHttpRequest();
            var url = "users.json";

            // AJAX
            $.ajax({
                url: "users.json",
                dataType: 'json',
                //SUCESSO
                success: function(json) {
                    var jsonUsers = json;
                    $.each(jsonUsers, function(key, val) {
                        var li =
                            `<li class="user-list-item flex-grid valign-middle">
                                <div class="col-12 flex-grid user-list-inner valign-middle halign-left">
                                    <figure class="user-list-figure mg-20--right">
                                        <img src="assets/dist/images/user-img.png" alt="Imagem Usuário">
                                    </figure>   
                                    <div class="flex-grid--wrap col valign-middle">     
                                        <div class="flex-grid--col is-md col-6">
                                            <h3 class="user-list-name col">${val.name}</h3>
                                            <a class="user-list-mail" href="" mailto:"${val.contact}">${val.contact}</a>
                                        </div> 
                                        <div class="is-md col-6 flex-grid user-list-condition valign-middle">
                                            <div class="user-list-status
                                            ${val.status.type === "ACTIVE" ? 'status-active' : ''}
                                            ${val.status.type === "EXIPIRED" ? 'status-expired' : ''}
                                            ${val.status.type === "WAITING-ACCEPTED" ? 'status-waiting-accepted' : ''}
                                            ${val.status.type === "WAITING" ? 'status-waiting' : ''}">
                                            </div>
                                            <span class="user-list-description">${val.status.description}</span>
                                        </div> 
                                    </div>
                                    <a href="void:0" class="user-list-option mg-20--left">
                                        <i class="fa fa-cog" aria-hidden="true"></i>
                                    </a>                                                                  
                                </div>
                            </li>`


                        // ORGANIZANDO OS ITENS EM ORDEM ALFABETICA

                        //DECLARANDO AS VARIÁVEIS
                        var ul = $('.user-list');
                        var listitems = ul.children('li').get();

                        // FUNÇÃO DE LISTAGEM
                        listitems.sort(function(a, b) {
                            var compA = $(a).text().toUpperCase();
                            var compB = $(b).text().toUpperCase();
                            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                        })
                        $.each(listitems, function(idx, itm) { ul.append(itm); });


                        // RENDERIZANDO A LI
                        ul.append(li);

                    });
                },
                //ERRO
                error: function() {
                    alert("Error");
                }
            });
        },

        //FUNÇÃO QUE FILTRA OS USUÁRIOS POR NOME
        filter: function() {

            //DECLARANDO VARIÁVEIS
            var input, filter, ul, li, searchButton, inner;
            input = document.getElementById("input");
            filter = input.value.toUpperCase();
            ul = document.getElementsByClassName("user-list");
            li = document.getElementsByClassName("user-list-item");
            searchButton = document.getElementById("search-button");


            //LOOP NA LI PARA RENDERIZAR OS USUÁRIOS
            for (var i = 0; i < li.length; i++) {
                inner = li[i].getElementsByClassName("user-list-inner")[0];
                if (inner.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].classList.remove("hide");
                } else {;
                    li[i].classList.add("hide");
                }
            }

            // BOTÃO QUE LIMPA O INPUT
            searchButton.addEventListener("click", function() {
                $(".user-list-item").removeClass("hide");
                input.value = "";
            });
        }
    },

    // EVENTOS
    events: {
        init: function() {
            //EVENTO DE TRIGGER DO FILTRO
            $(".form").on("keyup", function() {
                start.functions.filter();
            });
        }
    },

    // TRIGGER DE START
    init: function() {
        start.functions.renderList();
        start.events.init();
    }
};


// START
start.init();