Feature: Testando API pokemon

Background:
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testando retorno.
    Given url 'https://pokeapi.co/api/v2/pokemon/pikachu'
    When method get
    Then status 200

Scenario: Testando requisição invalida.
    Given url 'https://pokeapi.co/api/v2/pokemon/chocolate'
    When method get
    Then status 404

Scenario: Testando retorno pikachu e verificando o JSON.
    Given url url_base
    And path 'pokemon/pikachu'
    When method get
    Then status 200
    And match response.name == 'pikachu'
    And match response.id == 25 
    
Scenario: Testando retorno pokemon Rede entrando em um dos elementos do array de idiomas e testando retorno JSON
    Given url url_base
    And path 'version/1/'
    When method get
    Then status 200
    And def idioma = $.names[5].language.url
    And print idioma
    And url idioma
    When method get
    Then status 200
    And match response.name == 'es'
    And match response.id == 7


Scenario: Testando retorno do Charizard na rede e acessando uma URL contida no JSON.
    Given url url_base
    And path 'pokemon/charizard'
    When method get
    Then status 200
    And def url_abilities = $.abilities[1].ability.url
    And url url_abilities
    When method get
    Then status 200
    And match response.generation.name == 'generation-iv'
    
Scenario: Testando listagem de itens e verificando a descrição de um item específico.
    Given url url_base
    And path 'item'
    When method get
    Then status 200
    And def url_item = $.results[8].url
    And url url_item
    When method get
    Then status 200
    And match response.name == 'repeat-ball'
    And match response.cost == 1000
    And match response.effect_entries[0].effect == "Used in battle : Attempts to catch a wild Pokémon. If the wild Pokémon's species is marked as caught in the trainer's Pokédex, this ball has a catch rate of 3×. Otherwise, it has a catch rate of 1×. If used in a trainer battle, nothing happens and the ball is lost."