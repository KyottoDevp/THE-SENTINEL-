const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags,
    ComponentType,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const THUMBNAIL_URL = 'https://iili.io/fBem8MJ.png';

const COMMANDS_DATA = {
    moderacao: {
        info: {
            title: 'Segurança & Moderação',
            emoji: '<:icon_moderation:1441118756678930614>',
            desc: 'Um conjunto de ferramentas administrativas robustas, projetadas para garantir a integridade do servidor, gerenciar o comportamento dos membros e automatizar ações de moderação com precisão cirúrgica.',
            color: 0xED4245
        },
        commands: {
            ban: {
                name: '/ban',
                short: 'Bane permanentemente um usuário do servidor.',
                full: '### 🔨 Banimento de Usuário\n\nEste comando é a ferramenta definitiva para remover permanentemente um membro mal-intencionado do servidor. A ação é irreversível pelo usuário e foi projetada com múltiplas camadas de segurança para evitar abusos.\n\n**Fluxo de Execução:**\n> **1. Verificação Hierárquica:** O sistema primeiro valida se o moderador e o bot possuem cargos superiores ao do alvo, prevenindo conflitos de permissão e banimentos indevidos.\n> **2. Notificação Privada:** Antes da remoção, uma mensagem direta é enviada ao usuário, informando-o sobre o banimento e o motivo, garantindo transparência no processo.\n> **3. Execução e Registro:** A remoção é efetuada, e a ação é registrada nos logs de auditoria do servidor e no banco de dados interno do Sentinel System para referência futura.'
            },
            kick: {
                name: '/kick',
                short: 'Expulsa um usuário, permitindo que ele retorne.',
                full: '### 👢 Expulsão de Membro\n\nExecuta a remoção temporária de um usuário do servidor. Diferente do banimento, a expulsão permite que o membro retorne caso receba um novo convite. É uma medida disciplinar eficaz para infrações que não justificam uma remoção permanente.\n\n**Processo Detalhado:**\n> **Análise de Permissões:** Valida as permissões do moderador e do bot antes de prosseguir.\n> **Comunicação:** O usuário recebe uma notificação privada informando sobre a expulsão e o motivo.\n> **Ação Imediata:** O membro é removido do servidor instantaneamente após a confirmação do comando.'
            },
            mute: {
                name: '/mute',
                short: 'Silencia um usuário por um tempo determinado.',
                full: '### 🔇 Silenciamento Temporário (Timeout)\n\nUtiliza o sistema nativo de Timeout do Discord para restringir a capacidade de um membro de enviar mensagens, reagir e falar em canais de voz por um período específico. É a ferramenta ideal para acalmar situações de conflito ou punir spam.\n\n**Características Principais:**\n> **Duração Flexível:** Permite durações variadas, desde minutos até 28 dias.\n> **Segurança:** Realiza uma checagem de hierarquia para garantir que moderadores não possam silenciar administradores ou membros com cargos superiores.\n> **Registro de Punição:** A ação é registrada no histórico de moderação do usuário no banco de dados do bot.'
            },
            unmute: {
                name: '/unmute',
                short: 'Remove o silenciamento de um usuário.',
                full: '### 🔊 Remover Silenciamento\n\nReverte imediatamente uma punição de timeout ativa, restaurando todas as permissões de comunicação do usuário. Este comando é essencial para corrigir erros de moderação ou para ser usado ao final de um período de "bom comportamento".\n\n**Operação:**\n> O comando identifica se o usuário alvo está atualmente sob o efeito de um timeout.\n> Após a confirmação, a restrição é removida através da API do Discord.\n> Uma notificação de sucesso é exibida para o moderador.'
            },
            warn: {
                name: '/warn',
                short: 'Aplica uma advertência oficial a um usuário.',
                full: '### ⚠️ Sistema de Advertências (Warn)\n\nO pilar do sistema de moderação progressiva do Sentinel. Cada advertência é uma infração registrada no perfil do usuário, que se acumula ao longo do tempo. O sistema foi projetado para escalar punições automaticamente.\n\n**Automação e Consequências:**\n> **Contagem Ativa:** O sistema monitora o número de advertências ativas para cada membro.\n> **Punição Progressiva:** Com base nas configurações do `/warnconfig`, o usuário recebe cargos de punição específicos a cada nova advertência (ex: "1 Aviso", "2 Avisos").\n> **Banimento Automático:** Ao atingir o limite máximo de advertências configurado, o sistema executa automaticamente o banimento do usuário, garantindo uma aplicação consistente das regras.'
            },
            unwarn: {
                name: '/unwarn',
                short: 'Remove advertências de um usuário.',
                full: '### 🛡️ Remoção de Advertência\n\nOferece aos moderadores a capacidade de gerenciar e remover infrações do histórico de um membro. Esta ferramenta é crucial para reabilitação de usuários e correção de advertências aplicadas indevidamente.\n\n**Modos de Operação:**\n> **Remoção Seletiva:** Permite visualizar uma lista de todas as advertências de um usuário e remover uma infração específica pelo seu ID único.\n> **Limpeza Completa:** Uma opção para remover todas as advertências do histórico do usuário de uma só vez.\n> **Atualização de Cargos:** Ao remover uma advertência, o sistema automaticamente reavalia e atualiza os cargos de punição do membro.'
            },
            warnconfig: {
                name: '/warnconfig',
                short: 'Configura o sistema de advertências e punições.',
                full: '### ⚙️ Configuração do Módulo de Warns\n\nO painel de controle administrativo para o sistema de advertências. Através de uma interface interativa, os administradores podem moldar o comportamento do módulo de moderação para se adequar perfeitamente às regras do servidor.\n\n**Opções Configuráveis:**\n> **Definir Hierarquia de Cargos:** Associe cargos específicos a cada nível de advertência (1º aviso, 2º aviso, etc.).\n> **Estabelecer Limite de Banimento:** Determine o número exato de advertências que resultarão em um banimento automático.\n> **Ativar/Desativar Sistema:** Controle total sobre o status operacional do módulo.'
            },
            warnspanel: {
                name: '/warnpanel',
                short: 'Painel de gerenciamento de advertências.',
                full: '### 📋 Painel de Infrações do Usuário\n\nUma interface de gerenciamento visual para moderadores. Em vez de usar comandos de texto, este painel permite selecionar um usuário e visualizar um hub completo de ações de moderação.\n\n**Recursos do Painel:**\n> **Visão Geral:** Exibe o status atual do usuário, incluindo a contagem de advertências.\n> **Ações Rápidas:** Botões para adicionar/remover advertências, mutar, expulsar ou banir o usuário diretamente do painel.\n> **Histórico Detalhado:** Acesso a um visualizador paginado de todas as infrações do usuário, incluindo motivo, data e moderador responsável.'
            },
            nuke: {
                name: '/nuke',
                short: 'Recria um canal, limpando todo o histórico.',
                full: '### ☢️ Reset de Canal (Nuke)\n\nUma ferramenta de moderação poderosa para situações extremas, como raids ou spam massivo. O comando clona as configurações do canal atual (nome, tópico, permissões), deleta o canal original e cria a nova versão limpa em seu lugar.\n\n**Efeitos e Segurança:**\n> **Limpeza Total:** Todo o histórico de mensagens e anexos é permanentemente apagado.\n> **Preservação de Configurações:** A estrutura de permissões, o tópico e a posição do canal são mantidos, minimizando a necessidade de reconfiguração manual.\n> **Uso Controlado:** Requer permissões de administrador para ser executado, evitando acidentes.'
            },
            say: {
                name: '/say',
                short: 'Permite que o bot envie uma mensagem customizada.',
                full: '### 📢 Comunicado Oficial via Bot\n\nPermite que administradores enviem mensagens através do bot, utilizando sua identidade visual para anúncios, regras ou comunicados importantes. Ideal para manter a consistência e a autoridade nas mensagens da staff.\n\n**Capacidades Avançadas:**\n> **Suporte a Embeds:** Capacidade de enviar mensagens formatadas através de JSON, criando embeds ricos e personalizados.\n> **Envio em Múltiplos Canais:** Flexibilidade para enviar a mensagem no canal atual ou especificar outro canal do servidor.\n> **Anexos:** Suporte para incluir imagens e outros arquivos no comunicado.'
            },
            topmutes: {
                name: '/topmutes',
                short: 'Exibe um ranking de usuários mais mutados.',
                full: '### 📉 Ranking de Infrações de Mute\n\nGera um relatório estatístico que classifica os membros com o maior número de punições de silenciamento (timeout) no servidor. Esta ferramenta é vital para a análise de comportamento e identificação de membros reincidentes.\n\n**Análise de Dados:**\n> **Fonte de Dados:** Cruza informações dos Logs de Auditoria do Discord com o banco de dados interno para máxima precisão.\n> **Visualização Clara:** Exibe um ranking formatado dos usuários mais punidos, facilitando a identificação de padrões de comportamento negativo.'
            },
            unban: {
                name: '/unban',
                short: 'Revoga o banimento de um usuário pelo ID.',
                full: '### 🔓 Revogação de Banimento\n\nPermite que um administrador anule um banimento previamente aplicado, autorizando o retorno do usuário ao servidor. A operação requer o ID do Discord do usuário, garantindo que a pessoa correta seja perdoada.\n\n**Procedimento:**\n> **Busca por ID:** O moderador fornece o ID único do usuário.\n> **Ação na API:** O comando interage com a lista de banimentos do servidor no Discord para remover a restrição.\n> **Log de Anistia:** A revogação do banimento é registrada para fins de auditoria.'
            },
            permission: {
                name: '/permission',
                short: 'Gerencia permissões de usuário para comandos restritos.',
                full: '### 🔑 Gerenciador de Acesso (Usuário)\n\nUm comando de altíssimo nível, restrito ao proprietário do bot, para conceder acesso granular a comandos administrativos sensíveis. Garante que apenas usuários de extrema confiança possam operar os painéis de gerenciamento de conteúdo.\n\n**Função Principal:**\n> Controla o acesso a painéis como `/menu`, `/silksong` e `/dannegle`, que manipulam o banco de dados de conteúdo do bot.\n> Adiciona ou remove usuários da lista de permissão por ID.'
            },
            permissionrole: {
                name: '/permissionrole',
                short: 'Define cargos com acesso a painéis de moderação.',
                full: '### 🛂 Permissões por Cargo\n\nConfigura quais cargos do servidor têm autorização para utilizar os painéis de moderação, como o `/warnpanel`. Essencial para escalar a equipe de moderação de forma segura e eficiente.\n\n**Vantagens:**\n> **Gerenciamento Simplificado:** Em vez de dar permissão a cada moderador individualmente, basta atribuir o cargo configurado.\n> **Acesso Automático:** Novos moderadores recebem acesso aos painéis assim que ganham o cargo, e o perdem ao serem removidos, automatizando o controle de acesso.'
            },
            menu: {
                name: '/menu',
                short: 'Painel de gerenciamento de conteúdo de Silksong.',
                full: '### 🕷️ Painel de Gerenciamento: Silksong\n\nInterface administrativa interativa para o gerenciamento completo dos assets do jogo Silksong. Este painel é o centro de controle para todo o conteúdo que os membros podem acessar através dos hubs públicos.\n\n**Módulos Gerenciáveis:**\n> <:skin:1441118997847347291> **Skins:** Adicionar, remover e editar skins personalizadas.\n> <:save:1441118986161881241> **Saves:** Gerenciar arquivos de save para os jogadores.\n> <:mod:1441118928909766786> **Mods:** Controlar a lista de mods disponíveis.\n> <:Star:1441118708981563522> **FusionMods:** Gerenciar mods de fusão especiais.'
            },
            silksong: {
                name: '/silksong',
                short: 'Painel administrativo de Ports (Silksong).',
                full: '### 📱 Gestão de Versões (Ports de Silksong)\n\nPainel técnico avançado para a administração das diferentes versões portadas do jogo Silksong para plataformas mobile. Permite um controle refinado sobre o que é oferecido à comunidade.\n\n**Seleção de Equipes:**\n> **Porting Workshop:** Gerenciamento dos lançamentos desta equipe.\n> **Weave Wing:** Controle sobre as versões da Weave Wing.\n> **Gle Ports:** Administração dos ports desenvolvidos pela GLE.'
            },
            dannegle: {
                name: '/dannegle',
                short: 'Painel de gerenciamento de Hollow Knight Mobile.',
                full: '### 📱 Gestão de Versões (Hollow Knight Mobile)\n\nFerramenta administrativa para o controle das versões de Hollow Knight portadas para Android e iOS. Garante que os hubs de download estejam sempre atualizados com os últimos lançamentos estáveis.\n\n**Plataformas Gerenciáveis:**\n> **Dann Cooper (Android):** Controle total sobre os ports de Dann Cooper.\n> **GLE (iOS):** Gerenciamento das versões portadas pela GLE para dispositivos Apple.'
            }
        }
    },
    diversao: {
        info: {
            title: 'Diversão & Utilidade',
            emoji: '🎉',
            desc: 'Módulos interativos que enriquecem a experiência da comunidade, incluindo sistemas de economia, engajamento social, ferramentas de busca e utilitários gerais para o servidor.',
            color: 0xF1C40F
        },
        commands: {
            aposta: {
                name: '/aposta',
                short: 'Cria uma aposta em grupo valendo a moeda do servidor.',
                full: '### 🎰 Aposta em Grupo "Winner Takes All"\n\nInicia um evento de aposta interativo no chat. Um anfitrião define o valor da entrada e o número máximo de participantes. Os membros interessados entram na aposta, e quando a sala atinge a capacidade, o bot sorteia um único vencedor que leva o prêmio total acumulado.\n\n**Dinâmica do Evento:**\n> **1. Criação:** O anfitrião usa o comando para definir as regras da aposta.\n> **2. Entrada:** Os membros clicam em um botão para entrar, e o valor da entrada é debitado de seus saldos.\n> **3. Sorteio:** O sistema realiza um sorteio aleatório e justo, anunciando o grande vencedor.\n> **4. Premiação:** O prêmio total é transferido instantaneamente para a carteira do vencedor.'
            },
            balance: {
                name: '/balance',
                short: 'Verifica seu saldo e informações do perfil econômico.',
                full: '### 💳 Carteira Digital e Perfil\n\nExibe um resumo detalhado do seu status na economia do servidor. É a sua central de informações financeiras, apresentada em uma interface visual limpa e personalizada.\n\n**Informações Exibidas:**\n> **Saldo de Rosários:** Sua quantidade total da moeda virtual do servidor.\n> **Sequência Diária (Streak):** Mostra há quantos dias consecutivos você tem coletado sua recompensa diária, o que pode garantir bônus futuros.'
            },
            reward: {
                name: '/reward',
                short: 'Resgata sua recompensa diária de Rosários.',
                full: '### 🎁 Recompensa Diária\n\nUm sistema de fidelidade que incentiva a atividade diária. A cada 24 horas, os membros podem resgatar uma quantidade de "Rosários". A quantidade recebida é variável, adicionando um elemento de sorte e expectativa.\n\n**Mecânica de Jogo:**\n> **Cooldown de 24 Horas:** Garante que a recompensa só possa ser coletada uma vez por dia.\n> **Sistema de Streak:** Manter uma sequência de coletas diárias pode desbloquear recompensas maiores ou bônus especiais no futuro.'
            },
            callrank: {
                name: '/callrank',
                short: 'Exibe o ranking de tempo em canais de voz.',
                full: '### 🎙️ Ranking de Atividade em Voz\n\nRevela os membros mais engajados e comunicativos do servidor, criando um ranking baseado no tempo total que cada um passou conectado em canais de voz. É uma ótima maneira de reconhecer e valorizar a participação ativa da comunidade.\n\n**Funcionalidades:**\n> **Contagem Precisa:** O sistema monitora e acumula o tempo de voz de cada membro no banco de dados.\n> **Ranking Top 20:** Exibe uma lista formatada dos 20 membros com mais tempo de call, mostrando a duração exata para cada um.'
            },
            searches: {
                name: '/searches',
                short: 'Abre um painel interativo de pesquisas.',
                full: '### 🔍 Central de Pesquisas do Sentinel\n\nUm hub de navegação que permite aos usuários encontrar facilmente conteúdos específicos, como skins e mods, sem a necessidade de procurar em múltiplos canais. A interface utiliza botões para uma experiência de usuário fluida e intuitiva.\n\n**Categorias de Busca:**\n> Acesso rápido a menus de seleção para encontrar skins, mods e outros assets gerenciados pelo bot.'
            },
            sugerir: {
                name: '/sugerir',
                short: 'Envia uma sugestão para a staff do servidor.',
                full: '### 💡 Caixa de Sugestões Digital\n\nOferece um canal de comunicação direto e estruturado entre os membros e a equipe de administração. Ao usar o comando, um formulário (modal) é aberto para que o usuário possa detalhar sua ideia.\n\n**Ciclo da Sugestão:**\n> **1. Envio:** O membro preenche o formulário com sua sugestão.\n> **2. Publicação:** A sugestão é enviada para um canal pré-configurado, formatada com botões de votação (Concordo/Discordo).\n> **3. Votação Comunitária:** A comunidade vota, fornecendo um feedback inicial para a staff.\n> **4. Revisão:** A staff analisa a sugestão e os votos, podendo aprová-la ou rejeitá-la, com a decisão final atualizando a mensagem original.'
            },
            sugestaoconfig: {
                name: '/sugestaoconfig',
                short: 'Configura o sistema de sugestões.',
                full: '### 🛠️ Configuração do Módulo de Sugestões\n\nPainel administrativo completo para gerenciar todo o fluxo de sugestões. Permite que a staff configure o sistema, modere as propostas enviadas e analise o feedback da comunidade.\n\n**Funcionalidades do Painel:**\n> **Definir Canal:** Escolha para qual canal as novas sugestões serão enviadas.\n> **Ativar/Desativar:** Ligue ou desligue completamente o sistema de sugestões.\n> **Gerenciamento de Propostas:** Visualize sugestões pendentes, aprove ou rejeite ideias e consulte o histórico de decisões.'
            },
            translation: {
                name: '/translation',
                short: 'Adiciona um painel de tradução a uma mensagem.',
                full: '### 🌐 Tradutor Universal Integrado\n\nUma ferramenta poderosa para quebrar barreiras linguísticas dentro do servidor. Ao ser usado em resposta a uma mensagem, o comando anexa um painel interativo que permite a qualquer usuário traduzir o conteúdo da mensagem original para seu idioma de preferência.\n\n**Recursos:**\n> **Seleção de Idioma:** O usuário pode escolher e salvar seu idioma preferido para traduções futuras.\n> **Tradução Instantânea:** Com um clique, o texto da mensagem (ou do embed) é traduzido e exibido de forma privada (efêmera).\n> **Cooldown:** Possui um sistema de cooldown para evitar spam de traduções.'
            },
            notificacao: {
                name: '/notificacao',
                short: 'Abre o painel de gerenciamento de notificações.',
                full: '### 🔔 Gerenciador de Notificações por DM\n\nPermite que os membros personalizem sua experiência, escolhendo sobre quais tópicos desejam ser notificados. O sistema utiliza cargos para gerenciar as inscrições e envia mensagens diretas quando um conteúdo relevante é postado.\n\n**Como Funciona:**\n> **Painel de Inscrição:** Um painel com botões permite que os usuários se inscrevam ou cancelem a inscrição em diferentes categorias de notícias (ex: "Novos Mods", "Atualizações de Ports").\n> **Entrega Direta:** Quando um administrador posta uma novidade, o bot notifica todos os inscritos naquela categoria via DM.'
            },
            connect: {
                name: '/connect',
                short: 'Conecta o bot a um canal de voz.',
                full: '### 🔊 Conexão a Canal de Voz\n\nUm comando utilitário que instrui o bot a entrar no canal de voz em que o usuário está atualmente, ou em um canal especificado. É o primeiro passo para utilizar funcionalidades de áudio futuras.\n\n**Operação:**\n> Valida se o usuário está em um canal de voz válido.\n> Verifica se o bot tem permissão para se conectar e falar.\n> Estabelece a conexão e aguarda por comandos subsequentes.'
            },
            ping: {
                name: '/ping',
                short: 'Verifica a latência e o status do bot.',
                full: '### 📡 Diagnóstico de Rede e Status\n\nFornece um relatório técnico sobre a saúde e a responsividade do bot. Essencial para diagnosticar problemas de lentidão ou instabilidade.\n\n**Métricas Exibidas:**\n> **Latência da API:** O tempo que o Discord leva para responder a uma solicitação do bot.\n> **Latência do WebSocket:** A velocidade da conexão em tempo real entre o bot e os servidores do Discord.\n> **Uptime:** O tempo total que o bot está online ininterruptamente desde a sua última reinicialização.'
            },
            stock: {
                name: '/stock',
                short: 'Adiciona saldo a um usuário (Admin).',
                full: '### 🏦 Transferência de Fundos (Admin)\n\nComando administrativo para injetar "Rosários" na carteira de um usuário. Utilizado para premiar vencedores de eventos, corrigir erros de saldo ou para fins de teste da economia.\n\n**Procedimento Seguro:**\n> Apenas administradores com permissão podem usar o comando.\n> Gera um recibo visual (embed) confirmando a transação.\n> O saldo do usuário é atualizado em tempo real no banco de dados.'
            },
            remove: {
                name: '/remove',
                short: 'Remove saldo de um usuário (Admin).',
                full: '### 💸 Confisco de Fundos (Admin)\n\nPermite que a administração remova "Rosários" da carteira de um usuário. Pode ser usado para aplicar multas econômicas por quebra de regras ou para reverter transações fraudulentas.\n\n**Segurança e Validação:**\n> **Verificação de Permissão:** Acesso restrito a administradores autorizados.\n> **Proteção de Saldo:** O sistema impede que a remoção deixe o saldo do usuário negativo, garantindo a integridade da economia.'
            },
            listemojis: {
                name: '/listemojis',
                short: 'Lista todos os emojis personalizados do banco de dados.',
                full: '### 😀 Banco de Emojis do Sistema\n\nRealiza uma auditoria completa de todos os emojis personalizados que estão registrados no banco de dados do bot. É uma ferramenta de manutenção para garantir que todos os assets visuais estejam funcionando corretamente.\n\n**Relatório Gerado:**\n> **Verificação de Validade:** Checa se cada emoji ainda existe e é acessível pelo bot no Discord.\n> **Categorização:** Separa a lista em "Emojis Válidos" e "Emojis Inválidos" (que foram deletados do servidor), facilitando a limpeza.'
            },
            delete: {
                name: '/delete',
                short: 'Deleta um emoji obsoleto do banco de dados.',
                full: '### 🗑️ Limpeza de Assets de Emojis\n\nFerramenta para remover registros de emojis que não existem mais ou que se tornaram obsoletos. Ajuda a manter o banco de dados limpo e otimizado.\n\n**Métodos de Busca:**\n> Permite que o administrador localize o emoji a ser deletado pelo seu nome (título) ou pelo seu ID único do Discord, oferecendo flexibilidade na operação de limpeza.'
            }
        }
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Exibe a lista de comandos e suas descrições detalhadas.'),
    async execute(interaction) {
        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        const generateCategorySelect = (selected = null) => {
            const options = Object.entries(COMMANDS_DATA).map(([key, data]) => ({
                label: data.info.title,
                description: data.info.desc.substring(0, 100),
                value: key,
                emoji: data.info.emoji,
                default: key === selected
            }));

            return new StringSelectMenuBuilder()
                .setCustomId('help_category_select')
                .setPlaceholder('Navegue pelas categorias...')
                .addOptions(options);
        };

        const generateCommandSelect = (categoryKey, selectedCmd = null) => {
            const commands = COMMANDS_DATA[categoryKey].commands;
            const options = Object.entries(commands).map(([key, cmd]) => ({
                label: cmd.name,
                description: cmd.short,
                value: `cmd_${categoryKey}_${key}`,
                default: `cmd_${categoryKey}_${key}` === selectedCmd
            }));

            return new StringSelectMenuBuilder()
                .setCustomId('help_command_select')
                .setPlaceholder('Selecione um comando para ver detalhes...')
                .addOptions(options);
        };

        const generateBackButton = () => {
            return new ButtonBuilder()
                .setCustomId('help_back')
                .setLabel('Voltar')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('<a:Arrow2:1444562394373423144>');
        };

        const homeContainer = new ContainerBuilder()
            .setAccentColor(0x5865F2)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                .addTextDisplayComponents(
                    new TextDisplayBuilder()
                    .setContent("## 📚 Sentinel System | Documentação\n\nBem-vindo ao painel de ajuda interativo. Este sistema foi projetado para fornecer controle total sobre moderação, economia e utilitários.\n\n### 🧭 **Como Navegar**\nUtilize o menu **\"Categorias\"** abaixo para filtrar os módulos do bot. Dentro de cada módulo, você poderá selecionar comandos específicos para ler sua documentação técnica detalhada.\n\n> 🛡️ **Moderação:** Ferramentas de punição e controle.\n> 🎉 **Diversão:** Economia, rankings e utilitários.")
                )
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(generateCategorySelect())
            );

        const response = await interaction.editReply({
            components: [homeContainer],
            flags: MessageFlags.IsComponentsV2
        });

        const collector = response.createMessageComponentCollector({
            time: 600000
        });

        collector.on('collect', async (i) => {
            if (i.customId === 'help_back') {
                await i.update({
                    components: [homeContainer]
                });
                return;
            }

            if (i.customId === 'help_category_select') {
                const selection = i.values[0];
                const categoryKey = selection;
                const categoryData = COMMANDS_DATA[categoryKey];

                const categoryContainer = new ContainerBuilder()
                    .setAccentColor(categoryData.info.color)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder()
                            .setContent(`## ${categoryData.info.emoji} ${categoryData.info.title}\n\n${categoryData.info.desc}\n\n### 📂 Comandos Disponíveis\nSelecione um comando no menu **"Detalhes do Comando"** logo abaixo para visualizar sua documentação completa, permissões e modo de uso.`)
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(generateCommandSelect(categoryKey)),
                        new ActionRowBuilder().addComponents(generateBackButton())
                    );

                await i.update({
                    components: [categoryContainer]
                });
            } else if (i.customId === 'help_command_select') {
                const selection = i.values[0];
                const [_, catKey, cmdKey] = selection.split('_');
                const cmdData = COMMANDS_DATA[catKey].commands[cmdKey];
                const catInfo = COMMANDS_DATA[catKey].info;

                const commandContainer = new ContainerBuilder()
                    .setAccentColor(catInfo.color)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder()
                            .setContent(cmdData.full)
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(generateCommandSelect(catKey, selection)),
                        new ActionRowBuilder().addComponents(generateBackButton())
                    );

                await i.update({
                    components: [commandContainer]
                });
            }
        });
    }
};

// METADADOS GERADOS PELA IA - HORNET ORIGINAL
module.exports.help = {
  name: "help",
  description: "Central de ajuda avançada e documentação do sistema."
};
