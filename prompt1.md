Crie a constituição do projeto para um sistema que irá fornecer dados e estatísticas para um servidor alternativo de Tibia (um MMORPG 2d) chamado Rubinot (https://rubinot.com.br/news). Esse site será baseado no suported fansite do Tibia global chamado GuildStats (https://guildstats.eu/).
Alguns dados como exemplo: players online, bosses boostado no dia, ganhos de exp baseado no ranking do site oficial do rubinot (dados via API), top experiência, hunt finder, etc...
**A plataforma irá se chamar Rubibot Statistics**

O objetivo do projeto é demonstrar, de forma didática, aos jogadores que o jogo pode ser facilitado e mais performatico quando temos bons dados e dicas para nos ajudar.

Contexto do sistema:
O sistema permite que usuários colecionem figurinhas de um álbum da Copa, registrem suas figurinhas, identifiquem figurinhas repetidas e proponham trocas com outros usuários.

O sistema permite que usuários acessem dados de um personagem, dados dos mundos do Rubinot, dados gerais sobre o servidor.

Princípios do projeto:
- O sistema deve ser simples, didático e fácil de entender.
- O domínio deve ser modelado de forma clara.
- O desenvolvimento deve priorizar regras de negócio explícitas e bem documentadas.
- A implementação deve favorecer código limpo, organizado e fácil de evoluir.
- Cada evolução do sistema deve preservar compatibilidade com as funcionalidades já existentes.
- O sistema deve ser construído de forma incremental, começando por um MVP e depois evoluindo com novas capacidades.
- As regras de negócio devem ser implementadas de forma centralizada, evitando lógica duplicada.
- O projeto deve conter testes para validar os principais comportamentos do domínio.
- O código deve ser legível o suficiente para ser usado em treinamento técnico.
- A arquitetura deve ser simples, sem excesso de complexidade desnecessária.
- O projeto deve conter um ".CLAUDE.md" contendo as informações necessárias e excenciais para qualquer desenvolvedor utilizar o Claude Code para incrementar o projeto.
- O README.md deve sempre ser criado e/ou estar atualizado.
- As pastas e arquivos devem ficar arquiteturalmente estruturadas da melhor maneira possível baseado nas tecnologias utilizadas.

Diretrizes técnicas:
- Utilizar uma arquitetura em camadas simples, separando domínio, aplicação e infraestrutura.
- Evitar acoplamento direto entre regras de negócio e detalhes técnicos.
- Criar nomes claros para classes, métodos, entidades e serviços.
- Priorizar testes unitários para regras de negócio.
- Manter o domínio como principal fonte das regras do sistema.
- Não adicionar funcionalidades fora do escopo definido para cada fase.
- Cada nova evolução deve ser especificada antes de ser planejada e implementada.

Escopo inicial:
O MVP deve contemplar:
- página inicial utilizando as melhores práticas de desenvolvimento web do mercado e melhores tecnologias atuais;
- página inicial com informações como: total de jogadores online atualizando automaticamente, guilds criadas, mundos online, um espaço para atualizações e News como conteúdo principal na página, uma busca por personagem. (ter como referência a página do print @guild-stats-page.png - https://guildstats.eu/ - se preciso, navegue pela página referência para ideias de evolução do produto).
- A página referencia de detalhes dos personagens estão no arquivo character-details.png
- A página do rubinot está no print rubinot-home-page.png.

**Obs -> quando necessário, me diz quais endpoints irá precisar para que eu va atrás enquanto o desenvolvimento acontece.**

Evoluções previstas:
Evolução 1: TODO


Evolução 2: TODO

Gere uma constituição clara, objetiva e organizada para orientar todas as próximas etapas do desenvolvimento com Spec Kit.
Se for preciso e for de melhor forma de trabalhar, podemos criar skills, subagentes para que o Claude Code trabalhe de melhor forma, incontinuamente.