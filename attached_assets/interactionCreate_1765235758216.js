const {
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ChannelSelectMenuBuilder,
    ChannelType,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    MessageFlags,
    InteractionType,
    ComponentType,
    PermissionsBitField,
    ContainerBuilder,
    TextDisplayBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const ms = require('ms');
const translate = require('google-translate-api-x');

const CONFIGURACAO_IDIOMA = require('../config/languages.js');

const Skin = require('../database/models/skins.js');
const Save = require('../database/models/saves.js');
const Mod = require('../database/models/mods.js');
const FusionMod = require('../database/models/fusionmods.js');
const KnightSkin = require('../database/models/knightSkins.js');
const KnightSave = require('../database/models/knightSaves.js');
const KnightMod = require('../database/models/knightMods.js');
const FreddyPort = require('../database/models/freddy.js');
const ChinesPort = require('../database/models/chines.js');
const GlePortSilksong = require('../database/models/gleSilksong.js');
const DannCooperPort = require('../database/models/Android.js');
const GlePort = require('../database/models/Iphone.js');
const LogChannel = require('../database/models/logChannel.js');
const Warn = require('../database/models/Warn.js');
const WarnConfig = require('../database/models/warnConfig.js');
const Preference = require('../database/models/preferences.js');
const MensagemWorkshop = require('../database/models/mensagensWorkshop.js');
const MensagemWeave = require('../database/models/mensagensWeave.js');
const MensagemGle = require('../database/models/mensagensGle.js');
const Suggestion = require('../database/models/suggestion.js');
const SuggestionConfig = require('../database/models/suggestionConfig.js');

const DURACAO_EXPIRACAO_AVISO = 30 * 24 * 60 * 60 * 1000;
const THUMBNAIL_URL = 'https://iili.io/f2ePUAJ.png';

const CONFIGURACAO_ITEM_SILKSONG = {
    skins: {
        jogo: 'silksong',
        modelo: Skin,
        nome: 'Skin',
        nomePlural: 'Skins',
        emoji: '<:skin:1441118997847347291>',
        idMenuSelecao: 'menu_selecao_skin',
        corPrimaria: 0xDE4B52,
    },
    saves: {
        jogo: 'silksong',
        modelo: Save,
        nome: 'Save',
        nomePlural: 'Saves',
        emoji: '<:save:1441118986161881241>',
        idMenuSelecao: 'menu_selecao_save',
        corPrimaria: 0xE2B43C,
    },
    mods: {
        jogo: 'silksong',
        modelo: Mod,
        nome: 'Mod',
        nomePlural: 'Mods',
        emoji: '️<:mod:1441118928909766786>',
        idMenuSelecao: 'menu_selecao_mod',
        corPrimaria: 0x3B89B6,
    },
    fusion: {
        jogo: 'silksong',
        modelo: FusionMod,
        nome: 'Mod de Fusão',
        nomePlural: 'Mods de Fusão',
        emoji: '<:Star:1441118708981563522>',
        idMenuSelecao: 'menu_selecao_fusao',
        corPrimaria: 0x9B59B6,
    },
};

const CONFIGURACAO_ITEM_KNIGHT = {
    skins: {
        jogo: 'knight',
        modelo: KnightSkin,
        nome: 'Skin',
        nomePlural: 'Skins',
        emoji: '<:skin:1441118997847347291>',
        idMenuSelecao: 'menu_selecao_skin_knight',
        corPrimaria: 0xDE4B52,
    },
    saves: {
        jogo: 'knight',
        modelo: KnightSave,
        nome: 'Save',
        nomePlural: 'Saves',
        emoji: '<:save:1441118986161881241>',
        idMenuSelecao: 'menu_selecao_save_knight',
        corPrimaria: 0xE2B43C,
    },
    mods: {
        jogo: 'knight',
        modelo: KnightMod,
        nome: 'Mod',
        nomePlural: 'Mods',
        emoji: '️<:mod:1441118928909766786>',
        idMenuSelecao: 'menu_selecao_mod_knight',
        corPrimaria: 0x3B89B6,
    },
};

const CONFIGURACAO_ITEM_PORTS = {
    freddy: {
        jogo: 'ports',
        modelo: FreddyPort,
        nome: 'Porting Workshop',
        nomePlural: 'Ports (Porting Workshop)',
        emoji: '<:knightromantic:1441118908999401516>',
        idMenuSelecao: 'menu_selecao_port_freddy',
        corPrimaria: 0xFF0000,
    },
    chines: {
        jogo: 'ports',
        modelo: ChinesPort,
        nome: 'Weave Wing',
        nomePlural: 'Ports (Weave Wing)',
        emoji: '<:knightily:1441118889860661460>',
        idMenuSelecao: 'menu_selecao_port_chines',
        corPrimaria: 0xDA291C,
    },
    gleports: {
        jogo: 'ports',
        modelo: GlePortSilksong,
        nome: 'Gle Ports',
        nomePlural: 'Ports (Gle Ports)',
        emoji: '<:knightparty:1441118904163369076>',
        idMenuSelecao: 'menu_selecao_port_gle_silksong',
        corPrimaria: 0xFFC0CB,
    },
};

const CONFIGURACAO_ITEM_PORTS_KNIGHT = {
    dann: {
        jogo: 'knight_ports',
        modelo: DannCooperPort,
        nome: 'Port Dann Cooper',
        nomePlural: 'Ports (Dann Cooper)',
        emoji: '<:knightmorelove:1441118898282954854>',
        idMenuSelecao: 'menu_selecao_port_dann_cooper',
        corPrimaria: 0x3DDC84,
    },
    gle: {
        jogo: 'knight_ports',
        modelo: GlePort,
        nome: 'Port GLE',
        nomePlural: 'Ports (GLE)',
        emoji: '<:knightmuchlove:1441118899566542929>',
        idMenuSelecao: 'menu_selecao_port_gle',
        corPrimaria: 0xA2AAAD,
    },
};

const CONFIGURACAO_PAINEL_ADMIN = {
    silksong: {
        jsonEmbed: `{"color": 3553599, "description": "## <:Star:1441118708981563522> __Painel Hornet__\\n\\n <:icon_mention:1441118752983875766> Olá, **{user.mention}**!\\nEste painel foi criado para oferecer uma forma **rápida, prática e segura** de administrar os recursos do seu projeto.\\n\\n### ️<:icon_moderation:1441118756678930614> Recursos Disponíveis:\\n- <:save:1441118986161881241> __**Saves**__ – Gerencie e organize seus saves.\\n- <:mod:1441118928909766786>️ __**Mods**__ – Ative, desative ou configure facilmente.\\n- <:skin:1441118997847347291> __**Skins**__ – Personalize a aparência ao seu gosto.\\n- <:Star:1441118708981563522> __**FusionMods**__ – Gerencie Mods de Fusão por este painel."}`,
        configItem: CONFIGURACAO_ITEM_SILKSONG,
    },
    knight: {
        jsonEmbed: `{"color": 3553599, "description": "## <:Star:1441118708981563522> __Painel Knight__\\n\\n<:icon_mention:1441118752983875766>Olá, **{user}**!\\nEste painel foi criado para oferecer uma forma **rápida, prática e segura** de administrar os recursos do seu projeto.\\n\\n### <:icon_moderation:1441118756678930614> Recursos Disponíveis:\\n- 💾 __**Saves**__ – Gerencie e organize seus saves.\\n- 🛠️ __**Mods**__ – Ative, desative ou configure facilmente.\\n- 🎨 __**Skins**__ – Personalize a aparência ao seu gosto."}`,
        configItem: CONFIGURACAO_ITEM_KNIGHT,
    },
    ports: {
        configItem: CONFIGURACAO_ITEM_PORTS,
        embedsAdmin: {
            freddy: "### Sentinel System | Gerenciamento de Ports (Porting Workshop)\n\nUtilize os botões abaixo para gerenciar as versões dos ports da equipe **Porting Workshop**.\n\n**O que você pode fazer?**\n- **`Adicionar JSON`**: Adiciona uma nova versão com um embed customizado.\n- **`Remover`**: Deleta uma versão existente pelo título.\n- **`Editar Item`**: Modifica os dados de uma versão já cadastrada.\n- **`Postar Hub`**: Envia o menu principal de seleção de ports para um canal.",
            chines: "### Sentinel System | Gerenciamento de Ports (Weave Wing)\n\nUtilize os botões abaixo para gerenciar as versões dos ports da equipe **Weave Wing**.\n\n**O que você pode fazer?**\n- **`Adicionar JSON`**: Adiciona uma nova versão com um embed customizado.\n- **`Remover`**: Deleta uma versão existente pelo título.\n- **`Editar Item`**: Modifica os dados de uma versão já cadastrada.\n- **`Postar Hub`**: Envia o menu principal de seleção de ports para um canal.",
            gleports: "### Sentinel System | Gerenciamento de Ports (Gle Ports)\n\nUtilize os botões abaixo para gerenciar as versões dos **Gle Ports**.\n\n**O que você pode fazer?**\n- **`Adicionar JSON`**: Adiciona uma nova versão com um embed customizado.\n- **`Remover`**: Deleta uma versão existente pelo título.\n- **`Editar Item`**: Modifica os dados de uma versão já cadastrada.\n- **`Postar Hub`**: Envia o menu principal de seleção de ports para um canal."
        },
        hubEmbed: () => new ContainerBuilder()
            .setAccentColor(0xE74C3C)
            .addSectionComponents(section => section
                .setThumbnailAccessory(thumbnail => thumbnail
                    .setURL(THUMBNAIL_URL)
                )
                .addTextDisplayComponents(text => text
                    .setContent("## <:Star:1441118708981563522> Silksong Mobile\n\nBem-vindo ao Hub de Ports de Hollow Knight Silksong para Dispositivos Android!\n### 📖 Versões Disponíveis:\n- **__Porting Workshop__**\n  - Versão mais estável \n  - Gráficos aprimorados\n  - Não muito otimizada \n  - Suporte para **Teclado** e alguns **Controles** com bugs\n\n- **__Weave Wing__**\n  - Gráficos levemente reduzidos\n  - HUD customizável a qualquer momento \n  - Versão mais otimizada atualmente\n  - Suporte para **Tela de Toque**, **Teclado** e alguns **Controles** com bugs\n\n- **__GLE Ports__**\n  - Em desenvolvimento constante\n  - Cerca de **80%** do **progresso** \n  - Sem data de lançamento\n\n**Clique no botão abaixo** e escolha sua versão favorita para se aventurar em **Pharloom!**")
                )
            )
            .addSeparatorComponents(sep => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    },
    knight_ports: {
        configItem: CONFIGURACAO_ITEM_PORTS_KNIGHT,
        embedsAdmin: {
            dann: "### Sentinel System | Gerenciamento de Ports (Dann Cooper)\n\nUtilize os botões abaixo para gerenciar as versões dos ports de **Dann Cooper** para **Android**.\n\n**O que você pode fazer?**\n- **`Adicionar JSON`**: Adiciona uma nova versão com um embed customizado.\n- **`Remover`**: Deleta uma versão existente pelo título.\n- **`Editar Item`**: Modifica os dados de uma versão já cadastrada.\n- **`Postar Hub`**: Envia o menu principal de seleção de ports para um canal.",
            gle: "### Sentinel System | Gerenciamento de Ports (GLE)\n\nUtilize os botões abaixo para gerenciar as versões dos **GLE Ports** para **iOS**.\n\n**O que você pode fazer?**\n- **`Adicionar JSON`**: Adiciona uma nova versão com um embed customizado.\n- **`Remover`**: Deleta uma versão existente pelo título.\n- **`Editar Item`**: Modifica os dados de uma versão já cadastrada.\n- **`Postar Hub`**: Envia o menu principal de seleção de ports para um canal."
        },
        hubEmbed: () => new ContainerBuilder()
            .setAccentColor(0x206694)
            .addSectionComponents(section => section
                .setThumbnailAccessory(thumbnail => thumbnail
                    .setURL(THUMBNAIL_URL)
                )
                .addTextDisplayComponents(text => text
                    .setContent("## <:Star:1441118708981563522> Hollow Knight Mobile\n\nBem-vindo ao Hub de Ports de Hollow Knight para Dispositivos Android & iOS!\n### 📖 Versões Disponíveis:\n- **__Dan Cooper__**\n  - Focado em Android\n  - Gráficos aprimorados\n  - Versão mais otimizada atualmente\n  - Suporte para **Teclado**, **Tela de Toque** e **Controles** quase sem bugs\n- **__GLE Ports__**\n  - Focado em iOS\n  - Gráficos aprimorados\n  - Não muito bem otimizado\n  - Suporte para **Teclado**, **Tela de Toque** e **Controles** com alguns bugs\n\n**Clique no botão abaixo** e escolha sua versão favorita para explorar **Hallownest!**")
                )
            )
            .addSeparatorComponents(sep => sep.setDivider(true).setSpacing(SeparatorSpacingSize.Small))
    }
}

const CONFIGURACAO_LOG_TEXTO = {
    dann: {
        title: "🧪 Sentinel System | Log de Port (Dann Cooper)",
    },
    gle: {
        title: "🧪 Sentinel System | Log de Port (GLE)",
    },
    freddy: {
        title: "🧪 Sentinel System | Log de Port (Porting Workshop)",
    },
    chines: {
        title: "🧪 Sentinel System | Log de Port (Weave Wing)",
    },
    gleports: {
        title: "🧪 Sentinel System | Log de Port (Gle Ports)",
    },
    mods: {
        title: "🛠️ Sentinel System | Log de Mod",
    },
    skins: {
        title: "🎨 Sentinel System | Log de Skin",
    },
    saves: {
        title: "💾 Sentinel System | Log de Save",
    },
    fusion: {
        title: "<:Star:1441118708981563522> Sentinel System | Log de Mod de Fusão",
    }
};

const EMOJI_TRADUCAO = '<:traduzir:1441118827013210355>';

const cooldownsTraducao = new Map();
const SEGUNDOS_COOLDOWN_TRADUCAO = 5;

const truncarString = (str, max) => {
    if (typeof str !== 'string' || str.length <= max) return str;
    return str.substring(0, max - 3) + '...';
};

const criarContainerResposta = (titulo, descricao, cor = 0x5865F2) => {
    return new ContainerBuilder()
        .setAccentColor(cor)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## ${titulo}\n${descricao}`)
            )
        );
};

function criarContainerHubDeArquivo(filePath) {
    const absolutePath = path.resolve(__dirname, '..', filePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`[<a:Error:1441118696692256871>] Arquivo de configuração do hub não encontrado: ${absolutePath}`);
        throw new Error(`Config file not found: ${filePath}`);
    }

    const config = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    const container = new ContainerBuilder();

    if (config.accentColor) {
        container.setAccentColor(config.accentColor);
    }

    if (config.addSeparators) {
        container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));
    }

    if (config.mainSection) {
        const section = new SectionBuilder();
        if (config.mainSection.thumbnailUrl) {
            section.setThumbnailAccessory(new ThumbnailBuilder().setURL(config.mainSection.thumbnailUrl));
        }
        if (config.mainSection.content) {
            section.addTextDisplayComponents(new TextDisplayBuilder().setContent(config.mainSection.content));
        }
        container.addSectionComponents(section);
    }
    
    if (config.addSeparators) {
        container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));
    }

    if (config.mediaGallery && config.mediaGallery.items) {
        const galleryBuilder = new MediaGalleryBuilder();
        config.mediaGallery.items.forEach(item => {
            if (item.url) {
                galleryBuilder.addItems(new MediaGalleryItemBuilder().setURL(item.url));
            }
        });
        container.addMediaGalleryComponents(galleryBuilder);
    }
    
    if (config.addSeparators) {
        container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));
    }

    return container;
}


function criarContainerDeJson(jsonString, placeholders = {}) {
    for (const key in placeholders) {
        const placeholderRegex = new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        jsonString = jsonString.replace(placeholderRegex, placeholders[key]);
    }

    const data = JSON.parse(jsonString);
    const container = new ContainerBuilder();

    if (data.color) {
        container.setAccentColor(data.color);
    }

    const section = new SectionBuilder();
    let hasSectionContent = false;

    const thumbnailURL = data.thumbnail?.url || THUMBNAIL_URL;
    section.setThumbnailAccessory(new ThumbnailBuilder().setURL(thumbnailURL));
    hasSectionContent = true;

    let content = '';
    if (data.title) {
        content += `## ${data.title}\n`;
    }
    if (data.description) {
        content += data.description;
    }

    if (content) {
        section.addTextDisplayComponents(new TextDisplayBuilder().setContent(content));
        hasSectionContent = true;
    }

    if (hasSectionContent) {
        container.addSectionComponents(section);
    }

    if (data.fields && Array.isArray(data.fields)) {
        data.fields.forEach(field => {
            const fieldName = typeof field.name === 'string' ? field.name : 'Campo sem nome';
            const fieldValue = typeof field.value === 'string' ? field.value : 'Campo sem valor';
            container.addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### ${fieldName}\n${fieldValue}`)
            );
        });
    }

    if (data.image?.url) {
        container.addMediaGalleryComponents(
            new MediaGalleryBuilder().addItems(
                new MediaGalleryItemBuilder().setURL(data.image.url)
            )
        );
    }

    if (data.footer?.text) {
        container.addTextDisplayComponents(new TextDisplayBuilder().setContent(data.footer.text));
    }

    return container;
}


function analisarEmojiDiscord(stringEmoji) {
    if (!stringEmoji || typeof stringEmoji !== 'string') return null;
    const texto = stringEmoji.trim();
    const regexEmojiPersonalizado = /<?(a)?:?(\w+):(\d+)>?/;
    const matchPersonalizado = texto.match(regexEmojiPersonalizado);
    if (matchPersonalizado) {
        return {
            name: matchPersonalizado[2],
            id: matchPersonalizado[3],
            animated: !!matchPersonalizado[1],
        };
    }
    const regexEmojiUnicode = /^\p{Emoji_Presentation}$/u;
    if (regexEmojiUnicode.test(texto)) {
        return {
            name: texto
        };
    }
    return null;
}

async function validarECorrigirEmoji(stringEmoji, modelo, idItem) {
    if (!stringEmoji) return null;
    const emojiAnalisado = analisarEmojiDiscord(stringEmoji);
    if (emojiAnalisado) {
        return emojiAnalisado;
    }

    try {
        await modelo.findByIdAndUpdate(idItem, {
            $unset: {
                emoji: ""
            }
        });
    } catch (erroDB) {
        console.error(`[<a:Error:1441118696692256871>] Falha ao remover emoji inválido do item ID: ${idItem}`, erroDB);
    }
    return null;
}

async function responderComErro(interacao, erro, mensagemPersonalizada) {
    console.error(`[<a:Error:1441118696692256871>] Erro ao processar interação para ${interacao.user.tag} na guilda ${interacao.guild?.id || 'DM'}:`, erro);
    let localizacaoErro = "Não foi possível determinar a localização.";
    if (erro && erro.stack) {
        const linhasStack = erro.stack.split('\n');
        const linhaRelevante = linhasStack[1] ? linhasStack[1].trim() : "N/A";
        const matchLocalizacao = linhaRelevante.match(/\((.*):(\d+):(\d+)\)/);
        if (matchLocalizacao) {
            const nomeArquivo = matchLocalizacao[1].split(/[\\/]/).pop();
            localizacaoErro = `${nomeArquivo} (Linha: ${matchLocalizacao[2]})`;
        } else {
            localizacaoErro = linhaRelevante;
        }
    }
    const mensagemErro = erro.rawError?.message || erro.message || 'Nenhuma mensagem de erro específica.';

    const containerErro = new ContainerBuilder()
        .setAccentColor(0xED4245)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(
                new ThumbnailBuilder().setURL(THUMBNAIL_URL)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## Sentinel System | Erro Inesperado\n${mensagemPersonalizada || 'Ocorreu um problema ao processar sua solicitação. A equipe de desenvolvimento foi notificada.'}`)
            )
        )
        .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`**📜 Detalhes do Erro**\n\`\`\`${mensagemErro}\`\`\``),
            new TextDisplayBuilder().setContent(`**📍 Localização**\n\`\`\`js\n${localizacaoErro}\`\`\``),
            new TextDisplayBuilder().setContent(`**🕒 Timestamp**\n<t:${Math.floor(Date.now() / 1000)}:F>`)
        );

    try {
        const payload = {
            components: [containerErro],
            flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
        };
        if (interacao.replied || interacao.deferred) {
            await interacao.followUp(payload);
        } else {
            await interacao.reply(payload);
        }
    } catch (erroFollowUp) {
        console.error(`[<a:Error:1441118696692256871>] Falha CRÍTICA ao enviar mensagem de erro para o usuário:`, erroFollowUp);
    }
}

async function enviarLogAdicaoItem(interacao, tipo, dadosItem) {
    try {
        const configLog = await LogChannel.findOne({
            guildId: interacao.guild.id
        });
        if (!configLog || !configLog.channelId) {
            return;
        }
        const canalLog = await interacao.client.channels.fetch(configLog.channelId).catch(() => null);
        if (!canalLog) {
            return;
        }
        const configTexto = CONFIGURACAO_LOG_TEXTO[tipo];
        if (!configTexto) {
            return;
        }
        const timestamp = `<t:${Math.floor(Date.now() / 1000)}:F>`;
        const descricao = `> - **Título:** ${dadosItem.title}\n> - **Descrição:** ${dadosItem.description || '*Nenhuma descrição fornecida.*'}\n> - **Data:** ${timestamp}\n> - **Responsável:** <@${interacao.user.id}>`;

        const containerLog = new ContainerBuilder()
            .setAccentColor(0x5865F2)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## ${configTexto.title}\n${descricao}`)
                )
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent("Sistema Criado Por Kyo"));

        await canalLog.send({
            components: [containerLog],
            flags: MessageFlags.IsComponentsV2
        });
    } catch (erro) {
        console.error(`[<a:Error:1441118696692256871>] Falha ao enviar log de adição na guilda ${interacao.guild.id}:`, erro);
    }
}

async function mostrarSelecaoIdioma(interacao, pagina = 0) {
    if (!interacao.deferred && !interacao.replied) {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
    }

    const IDIOMAS_POR_PAGINA = 25;
    const totalPaginas = Math.ceil(CONFIGURACAO_IDIOMA.length / IDIOMAS_POR_PAGINA);
    pagina = Math.max(0, Math.min(pagina, totalPaginas - 1));

    const indiceInicial = pagina * IDIOMAS_POR_PAGINA;
    const idiomasParaMostrar = CONFIGURACAO_IDIOMA.slice(indiceInicial, indiceInicial + IDIOMAS_POR_PAGINA);

    const opcoesMenu = idiomasParaMostrar.map(idioma => ({
        label: idioma.label,
        value: `traduzir_definir_idioma_${idioma.value}`,
        emoji: analisarEmojiDiscord(EMOJI_TRADUCAO)
    }));

    const menuSelecao = new StringSelectMenuBuilder()
        .setCustomId('menu_selecao_idioma_traducao')
        .setPlaceholder('Selecione um idioma...')
        .addOptions(opcoesMenu);

    const linhaNavegacao = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`traduzir_pagina_${pagina - 1}`)
        .setLabel('<')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(pagina === 0),
        new ButtonBuilder()
        .setCustomId('traduzir_info_pagina')
        .setLabel(`${pagina + 1}/${totalPaginas}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
        new ButtonBuilder()
        .setCustomId(`traduzir_pagina_${pagina + 1}`)
        .setLabel('>')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(pagina >= totalPaginas - 1)
    );

    const containerTraducao = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(
                new ThumbnailBuilder().setURL(THUMBNAIL_URL)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent("## Sentinel System | Tradutor\nEscolha o idioma para o qual você deseja traduzir a mensagem.")
            )
        )
        .addActionRowComponents(
            new ActionRowBuilder().addComponents(menuSelecao)
        )
        .addActionRowComponents(linhaNavegacao);

    await interacao.editReply({
        components: [containerTraducao],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function processarSalvamentoIdioma(interacao, codigoIdiomaSelecionado) {
    await interacao.deferUpdate();
    const idioma = CONFIGURACAO_IDIOMA.find(lang => lang.value === codigoIdiomaSelecionado);

    if (!idioma) {
        return responderComErro(interacao, new Error(`Código de idioma inválido selecionado: ${codigoIdiomaSelecionado}`), 'Ocorreu um erro interno: Idioma inválido.');
    }

    try {
        await Preference.findOneAndUpdate({
            userId: interacao.user.id
        }, {
            language: codigoIdiomaSelecionado
        }, {
            upsert: true,
            new: true
        });

        const containerSucesso = criarContainerResposta(
            'Sentinel System | Idioma Salvo',
            `**Idioma escolhido com sucesso!**\n- Da próxima vez que pressionar o botão 'Traduzir', a mensagem aparecerá em **${idioma.label}**.`,
            0x57F287
        );

        await interacao.editReply({
            components: [containerSucesso],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });

    } catch (erroDB) {
        await responderComErro(interacao, erroDB, 'Ocorreu um erro ao salvar sua preferência no banco de dados.');
    }
}

async function realizarTraducao(interacao) {
    const containerDefer = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('**Sentinel System | Traduzindo...**\n⏳ Um segundo, estamos traduzindo para o seu idioma...'));

    await interacao.deferReply({
        components: [containerDefer],
        flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
    });

    try {
        const prefUsuario = await Preference.findOne({
            userId: interacao.user.id
        });
        if (!prefUsuario || !prefUsuario.language) {
            const containerErro = criarContainerResposta('Sentinel System | Idioma Não Definido', 'Você ainda não selecionou um idioma. Clique no botão `Escolha seu idioma` primeiro.', 0xFFCC00);
            return interacao.editReply({
                components: [containerErro],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        const idMensagem = interacao.message.reference?.messageId;
        if (!idMensagem) {
            const containerErroGuia = criarContainerResposta('Sentinel System | Erro de Tradução', 'Para usar este botão, a mensagem que o contém deve ser uma **resposta** à mensagem que você deseja traduzir.', 0xED4245);
            return interacao.editReply({
                components: [containerErroGuia],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        const mensagemOriginal = await interacao.channel.messages.fetch(idMensagem).catch(() => null);
        if (!mensagemOriginal) {
            return responderComErro(interacao, new Error(`Mensagem com ID ${idMensagem} não encontrada.`), "A mensagem original não pôde ser encontrada ou foi excluída.");
        }

        const embedOriginal = mensagemOriginal.embeds[0];
        const conteudoOriginal = mensagemOriginal.content;
        const targetLang = prefUsuario.language;
        const idiomaInfo = CONFIGURACAO_IDIOMA.find(lang => lang.value === targetLang);
        const nomeIdioma = idiomaInfo ? idiomaInfo.label : targetLang;

        let todosOsTextos = [];
        let estrutura = {
            tipo: 'texto',
            contagemCampos: 0
        };

        todosOsTextos.push(`Translated to ${nomeIdioma}`);

        if (embedOriginal) {
            estrutura.tipo = 'embed';
            todosOsTextos.push(embedOriginal.title || '');
            todosOsTextos.push(embedOriginal.description || '');
            embedOriginal.fields.forEach(field => {
                todosOsTextos.push(field.name);
                todosOsTextos.push(field.value);
            });
            estrutura.contagemCampos = embedOriginal.fields.length;
        } else if (conteudoOriginal) {
            todosOsTextos.push(conteudoOriginal);
        }

        if (todosOsTextos.slice(1).every(text => !text || text.trim() === '')) {
            const containerVazio = criarContainerResposta('Sentinel System | Nenhum Texto', 'A mensagem original não contém nenhum texto para traduzir.', 0xFFCC00);
            return await interacao.editReply({
                components: [containerVazio],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        const SEPARADOR = ' ||| ';
        const textoUnido = todosOsTextos.join(SEPARADOR);

        let resultadoTraducao;
        try {
            resultadoTraducao = await translate(textoUnido, {
                to: targetLang,
                forceTo: true
            });
        } catch (err) {
            console.error("Erro na tradução:", err);
            resultadoTraducao = {
                text: ""
            };
        }

        const textosTraduzidos = resultadoTraducao?.text ?
            resultadoTraducao.text.split(SEPARADOR) :
            [];

        const textos = Array.isArray(textosTraduzidos) ? textosTraduzidos : [];
        const cabecalhoTraduzido = textos[0] || `Traduzido para ${nomeIdioma}`;
        let conteudoPrincipal = `## ${cabecalhoTraduzido}\n`;
        let ponteiroTexto = 1;

        if (estrutura.tipo === 'embed') {
            const tituloTraduzido = textos[ponteiroTexto++] || '';
            const descricaoTraduzida = textos[ponteiroTexto++] || '';
            if (tituloTraduzido) conteudoPrincipal += `### ${tituloTraduzido}\n`;
            if (descricaoTraduzida) conteudoPrincipal += `${descricaoTraduzida}`;
        } else {
            const corpoTraduzido = textos[ponteiroTexto++] || '';
            conteudoPrincipal += corpoTraduzido;
        }

        const section = new SectionBuilder()
            .setThumbnailAccessory(
                new ThumbnailBuilder().setURL(
                    mensagemOriginal?.author?.displayAvatarURL({
                        dynamic: true,
                        size: 256
                    }) || ""
                )
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    truncarString(conteudoPrincipal, 4000) || "Tradução indisponível"
                )
            );

        const containerFinal = new ContainerBuilder()
            .setAccentColor(0xFFFFFF)
            .addSectionComponents(section);

        if (estrutura.tipo === 'embed' && estrutura.contagemCampos > 0) {
            for (let i = 0; i < estrutura.contagemCampos; i++) {
                const nomeCampoTraduzido =
                    textos[ponteiroTexto++] ||
                    embedOriginal?.fields?.[i]?.name ||
                    "Campo sem nome";

                const valorCampoTraduzido =
                    textos[ponteiroTexto++] ||
                    embedOriginal?.fields?.[i]?.value ||
                    "Campo sem valor";

                containerFinal.addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                );
                containerFinal.addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        `### ${nomeCampoTraduzido}\n${valorCampoTraduzido}`
                    )
                );
            }
        }
        const anexoImagem = mensagemOriginal.attachments.find(att => att.contentType?.startsWith('image/'));
        const imagemEmbed = embedOriginal?.image?.url;
        const urlImagem = imagemEmbed || anexoImagem?.url;

        if (urlImagem) {
            containerFinal.addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(urlImagem))
            );
        }

        await interacao.editReply({
            components: [containerFinal],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });

    } catch (erro) {
        if (erro.message && erro.message.includes('invalid target language')) {
            return responderComErro(interacao, erro, `O idioma selecionado não é suportado para tradução.`);
        }
        await responderComErro(interacao, erro, 'Ocorreu um erro inesperado durante o processo de tradução.');
    }
}


const eAdmin = (membro) => {
    return membro.permissions.has(PermissionsBitField.Flags.Administrator);
};

async function mostrarModalAdicionarItem(interacao, tipo, jogo) {
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];
    const tituloModal = truncarString(`Adicionar ${config.nome} (Link)`, 45);
    const modal = new ModalBuilder().setCustomId(`adicionar_${tipo}_${jogo}_modal`).setTitle(tituloModal);

    modal.addComponents(
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_titulo')
            .setLabel(truncarString(`Título do ${config.nome} (Máx: 100 chars)`, 45))
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(100)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_descricao')
            .setLabel(truncarString("Descrição (Máx: 1000 chars)", 45))
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
            .setMaxLength(1000)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_link')
            .setLabel(truncarString("Link de Download", 45))
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_emoji')
            .setLabel(truncarString("Emoji (Opcional)", 45))
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
    );
    await interacao.showModal(modal);
}

async function mostrarModalAdicionarItemJson(interacao, tipo, jogo) {
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo]?.configItem[tipo];
    if (!config) {
        return responderComErro(interacao, new Error(`Configuração inválida para jogo='${jogo}' e tipo='${tipo}'`), 'Erro de configuração interna.');
    }
    const tituloModal = truncarString(`Adicionar ${config.nome} (JSON)`, 45);
    const modal = new ModalBuilder().setCustomId(`adicionar_json_${tipo}_${jogo}_modal`).setTitle(tituloModal);

    modal.addComponents(
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_titulo')
            .setLabel(truncarString(`Título do ${config.nome} (Máx: 100 chars)`, 45))
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(100)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_descricao')
            .setLabel(truncarString("Descrição (Opcional, Máx: 1000 chars)", 45))
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
            .setMaxLength(1000)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_json')
            .setLabel(truncarString("Container JSON", 45))
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
            .setCustomId('item_emoji')
            .setLabel(truncarString("Emoji (Opcional)", 45))
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        )
    );
    await interacao.showModal(modal);
}

async function mostrarMenuSelecaoEditarItem(interacao, tipo, jogo) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const config = CONFIGURACAO_PAINEL_ADMIN[jogo]?.configItem[tipo];
    if (!config) {
        return responderComErro(interacao, new Error(`Configuração inválida para jogo='${jogo}' e tipo='${tipo}'`), 'Erro de configuração interna.');
    }

    const todosItens = await config.modelo.find({ guildId: interacao.guild.id }).sort({
        position: 1
    });

    if (todosItens.length === 0) {
        const containerSemItens = criarContainerResposta('Sentinel System | Sem Itens', `Não há **${config.nomePlural}** para editar. Adicione um item primeiro.`, 0xFFCC00);
        return interacao.editReply({
            components: [containerSemItens],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const itensEditaveis = todosItens.filter(item => item.jsonEmbed);

    if (itensEditaveis.length === 0) {
        const msgSemEditaveis = (jogo === 'ports' || jogo === 'knight_ports') ?
            `Não há **${config.nomePlural}** configurados com **JSON** para edição. Adicione um através do botão 'Adicionar JSON' primeiro.` :
            `Não há **${config.nomePlural}** configurados com JSON para edição.`;

        const containerSemEditaveis = criarContainerResposta('Sentinel System | Sem Itens Editáveis', msgSemEditaveis, 0xFFCC00);
        return interacao.editReply({
            components: [containerSemEditaveis],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const opcoes = itensEditaveis.slice(0, 24).map((item, index) => ({
        label: truncarString(`(${item.position || index + 1}) ${item.title}`, 100),
        description: `ID: ${item._id}`,
        value: item._id.toString(),
        emoji: analisarEmojiDiscord(item.emoji) || analisarEmojiDiscord(config.emoji) || undefined,
    }));

    const menuSelecao = new StringSelectMenuBuilder()
        .setCustomId(`selecao_editar_${tipo}_${jogo}`)
        .setPlaceholder(truncarString(`Selecione um ${config.nome} para editar`, 150))
        .addOptions(opcoes);

    const containerEdicao = new ContainerBuilder()
        .setAccentColor(config.corPrimaria)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## Sentinel System | Edição de ${config.nomePlural}\n\nSelecione o item que deseja editar na lista abaixo. Apenas itens configurados com JSON podem ser editados por este painel.\n\nMostrando **${opcoes.length}** de **${itensEditaveis.length}** itens editáveis.`)
            )
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
        .addActionRowComponents(new ActionRowBuilder().addComponents(menuSelecao));

    await interacao.editReply({
        components: [containerEdicao],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function mostrarHubDelecao(interacao, tipo, jogo) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const config = CONFIGURACAO_PAINEL_ADMIN[jogo]?.configItem[tipo];
    if (!config) {
        return responderComErro(interacao, new Error(`Configuração inválida para jogo='${jogo}' e tipo='${tipo}'`), 'Erro de configuração interna.');
    }

    const itens = await config.modelo.find({
        guildId: interacao.guild.id
    }).sort({
        position: 1
    });

    if (itens.length === 0) {
        const containerSemItens = new ContainerBuilder()
            .setAccentColor(0xFEE75C)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## Sentinel System | Sem Itens\n\nNão há **${config.nomePlural}** para remover. Adicione um item primeiro.`)
                )
            );
        return interacao.editReply({
            components: [containerSemItens],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const opcoes = itens.slice(0, 25).map((item, index) => {
        const opcao = {
            label: truncarString(item.title, 100),
            description: `Posição: ${item.position || index + 1}`,
            value: item._id.toString(),
        };
        const emoji = analisarEmojiDiscord(item.emoji) || analisarEmojiDiscord(config.emoji);
        if (emoji) {
            opcao.emoji = emoji;
        }
        return opcao;
    });

    const menuSelecao = new StringSelectMenuBuilder()
        .setCustomId(`selecao_remover_${tipo}_${jogo}`)
        .setPlaceholder(`Selecione o(a) ${config.nome} que deseja remover`)
        .addOptions(opcoes);

    const containerHub = new ContainerBuilder()
        .setAccentColor(0xED4245)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`## 🗑️ Sentinel System | Hub de Deleção\n\nSelecione um item da lista abaixo para iniciar o processo de remoção. Uma etapa de confirmação será necessária antes que a exclusão seja permanente.\n\nAtualmente existem **${itens.length}** ${config.nomePlural.toLowerCase()} cadastrados.`)
            )
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
        .addActionRowComponents(new ActionRowBuilder().addComponents(menuSelecao));

    await interacao.editReply({
        components: [containerHub],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}


async function postarEmbedHub(interacao, tipo, jogo) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const eSistemaPort = jogo === 'ports' || jogo === 'knight_ports';
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo]?.configItem[tipo];
    if (!config) {
        return responderComErro(interacao, new Error(`Configuração inválida para jogo='${jogo}' e tipo='${tipo}'`), 'Erro de configuração interna.');
    }

    const placeholder = eSistemaPort ?
        `Selecione o canal para postar o Hub de Ports` :
        `Selecione o canal para postar o Hub de ${config.nomePlural}`;

    const selecaoCanal = new ChannelSelectMenuBuilder()
        .setCustomId(`postar_${tipo}_${jogo}_selecao_canal`)
        .setPlaceholder(truncarString(placeholder, 150))
        .addChannelTypes(ChannelType.GuildText);

    const container = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent("## Sentinel System | Módulo de Postagem\n\nEsta interface permite a publicação de hubs de conteúdo em canais de texto específicos. Selecione um canal no menu abaixo para enviar o hub principal, que servirá como ponto de entrada para os usuários acessarem os recursos disponíveis."))
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
        .addActionRowComponents(new ActionRowBuilder().addComponents(selecaoCanal));

    await interacao.editReply({
        components: [container],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function mostrarMenuDefinirCanalLogs(interacao) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const selecaoCanal = new ChannelSelectMenuBuilder()
        .setCustomId('definir_canal_logs_selecao')
        .setPlaceholder(truncarString('Selecione o canal para enviar logs', 150))
        .addChannelTypes(ChannelType.GuildText);

    const container = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent("## Sentinel System | Configuração de Logs\n\nUtilize esta função para definir o canal onde todas as atividades de adição, remoção e edição de itens serão registradas. Manter um canal de logs é crucial para a auditoria e moderação do conteúdo."))
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
        .addActionRowComponents(new ActionRowBuilder().addComponents(selecaoCanal));

    await interacao.editReply({
        components: [container],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function atualizarCargosAviso(membro, contagemAvisos) {
    if (!membro) return;

    try {
        const configWarn = await WarnConfig.findOne({ guildId: membro.guild.id });
        if (!configWarn || !configWarn.warnRoles || configWarn.warnRoles.length === 0) return;

        const rolesParaRemover = configWarn.warnRoles;
        let roleParaAdicionar = null;

        if (contagemAvisos > 0 && contagemAvisos <= configWarn.warnRoles.length) {
            const roleId = configWarn.warnRoles[contagemAvisos - 1];
            if (roleId) roleParaAdicionar = roleId;
        } else if (contagemAvisos > configWarn.warnRoles.length) {
             const roleId = configWarn.warnRoles[configWarn.warnRoles.length - 1];
             if (roleId) roleParaAdicionar = roleId;
        }

        await membro.roles.remove(rolesParaRemover.filter(id => id && membro.roles.cache.has(id)));

        if (roleParaAdicionar) {
            await membro.roles.add(roleParaAdicionar);
        }
    } catch (erro) {
        console.error(`[<a:Error:1441118696692256871>] Falha ao atualizar cargos de aviso para ${membro.user.tag} na guilda ${membro.guild.id}:`, erro);
    }
}

async function verificarERemoverAvisosExpirados(idGuilda, idUsuario) {
    try {
        const todosAvisos = await Warn.find({
            guildId: idGuilda,
            userId: idUsuario
        });
        const avisosParaRemover = todosAvisos.filter(aviso => (Date.now() - aviso.timestamp.getTime()) > DURACAO_EXPIRACAO_AVISO);

        if (avisosParaRemover.length > 0) {
            await Warn.deleteMany({
                _id: {
                    $in: avisosParaRemover.map(a => a._id)
                }
            });
            return true;
        }
        return false;
    } catch (erro) {
        console.error(`[<a:Error:1441118696692256871>] Erro ao verificar avisos expirados para o usuário ${idUsuario} na guilda ${idGuilda}:`, erro);
        return false;
    }
}

async function verificarWarnConfig(guildId) {
    const config = await WarnConfig.findOne({ guildId: guildId });
    if (!config || !config.active || !config.warnRoles || config.warnRoles.length === 0) {
        return null;
    }
    return config;
}

async function mostrarPainelAvisos(interacao, idUsuarioAlvo) {
    if (!interacao.isRepliable()) return;
    if (!interacao.deferred && !interacao.replied) {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
    }

    const config = await verificarWarnConfig(interacao.guild.id);
    if (!config) {
        const containerInativo = new ContainerBuilder()
            .setAccentColor(0xFEE75C)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("## Sentinel System | Warn Configuração\n\nO sistema de avisos está **desativado** ou **não foi configurado** neste servidor. Para utilizar esta funcionalidade, um administrador precisa configurar os cargos e ativar o sistema.\n\n**Ação para Administradores:**\nUtilize o comando de configuração `/warnconfig` para definir os cargos de punição e ativar o módulo.")
                )
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

        return interacao.editReply({
            components: [containerInativo],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const avisosExpiraram = await verificarERemoverAvisosExpirados(interacao.guild.id, idUsuarioAlvo);

    const membroAlvo = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
    if (!membroAlvo) {
        const containerErro = criarContainerResposta('Sentinel System | Erro', 'O usuário selecionado não foi encontrado neste servidor.', 0xED4245);
        return interacao.editReply({
            components: [containerErro],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const avisosUsuario = await Warn.find({
        guildId: interacao.guild.id,
        userId: idUsuarioAlvo
    });

    if (avisosExpiraram) {
        await atualizarCargosAviso(membroAlvo, avisosUsuario.length);
    }

    const descricaoPainel = `## <:icon_moderation:1441118756678930614> Sentinel System | Gerenciamento\n\n**Informações do Usuário**\n- **Usuário:** <@${membroAlvo.id}>\n- **Status:** Ativo\n- **Avisos:** **${avisosUsuario.length}/${config.maxWarns}**\n\n**Ações Disponíveis**\n- Use os botões abaixo para gerenciar este usuário com segurança.`;

    const containerGerenciamento = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(
                new ThumbnailBuilder().setURL(membroAlvo.user.displayAvatarURL({
                    dynamic: true
                }))
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(descricaoPainel)
            )
        )
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

    const linha1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`aviso_adicionar_${idUsuarioAlvo}`).setLabel('Adicionar Aviso').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`aviso_remover_${idUsuarioAlvo}`).setLabel('Remover Aviso').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`aviso_historico_${idUsuarioAlvo}`).setLabel('Ver Histórico').setStyle(ButtonStyle.Secondary)
    );
    const linha2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`aviso_expulsar_${idUsuarioAlvo}`).setLabel('Expulsar Usuário').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId(`aviso_banir_${idUsuarioAlvo}`).setLabel('Banir Usuário').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId(`aviso_mutar_${idUsuarioAlvo}`).setLabel('Mutar Usuário').setStyle(ButtonStyle.Danger)
    );

    containerGerenciamento.addActionRowComponents(linha1, linha2);

    await interacao.editReply({
        components: [containerGerenciamento],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function tratarPaginacaoHistoricoAvisos(interacao) {
    await interacao.deferUpdate();
    const [_, __, idUsuarioAlvo, strPagina] = interacao.customId.split('_');
    const pagina = parseInt(strPagina, 10) || 0;

    const avisos = await Warn.find({
        guildId: interacao.guild.id,
        userId: idUsuarioAlvo
    }).sort({
        timestamp: -1
    });

    if (!avisos.length) {
        const containerVazio = criarContainerResposta('Sentinel System | Histórico Vazio', 'Este usuário não possui avisos.', 0x5865F2);
        return interacao.followUp({
            components: [containerVazio],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const membroAlvo = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
    if (!membroAlvo) {
        const containerErro = criarContainerResposta('Sentinel System | Erro', 'O usuário não está mais no servidor.', 0xED4245);
        return interacao.editReply({
            components: [containerErro],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const aviso = avisos[pagina];
    if (!aviso) return;

    const moderador = await interacao.guild.members.fetch(aviso.moderatorId).catch(() => ({
        user: {
            tag: 'Moderador Desconhecido'
        },
        toString: () => '`Desconhecido`'
    }));

    const descricao = `## <:icon_moderation:1441118756678930614> Sentinel System | Histórico ${pagina + 1}/${avisos.length}\n` +
        `- **Usuário:** <@${membroAlvo.id}> (${membroAlvo.user.tag})\n` +
        `- **Motivo:** ${aviso.reason}\n` +
        `- **Moderador:** ${moderador.toString()} (${moderador.user.tag})\n` +
        `- **Data:** <t:${Math.floor(aviso.timestamp.getTime() / 1000)}:F>`;

    const footer = `ID do Aviso: ${aviso._id}\n_Este usuário possui um total de ${avisos.length} aviso(s) em seu histórico._`;

    const containerHistorico = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addSectionComponents(
            new SectionBuilder()
            .setThumbnailAccessory(new ThumbnailBuilder().setURL(membroAlvo.user.displayAvatarURL({
                dynamic: true
            })))
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(descricao))
        )
        .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(footer));

    const linhaNavegacao = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`aviso_historico_${idUsuarioAlvo}_${pagina - 1}`)
        .setLabel('Anterior')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(pagina === 0),
        new ButtonBuilder()
        .setCustomId(`aviso_historico_${idUsuarioAlvo}_${pagina + 1}`)
        .setLabel('Próximo')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(pagina >= avisos.length - 1)
    );

    containerHistorico.addActionRowComponents(linhaNavegacao);

    await interacao.editReply({
        components: [containerHistorico],
        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
    });
}

async function processarRemocaoAvisoUnico(interacao) {
    await interacao.deferUpdate();
    const idAviso = interacao.values[0];

    try {
        const avisoDeletado = await Warn.findByIdAndDelete(idAviso);
        if (avisoDeletado) {
            const membro = await interacao.guild.members.fetch(avisoDeletado.userId).catch(() => null);
            const avisosRestantes = await Warn.countDocuments({
                guildId: interacao.guild.id,
                userId: avisoDeletado.userId
            });
            await atualizarCargosAviso(membro, avisosRestantes);

            const containerSucesso = criarContainerResposta('Sentinel System | Sucesso', 'O aviso foi removido com sucesso e os cargos foram atualizados.', 0x57F287);
            await interacao.editReply({
                components: [containerSucesso],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        } else {
            const containerErro = criarContainerResposta('Sentinel System | Erro', 'O aviso selecionado não foi encontrado. Ele pode já ter sido removido.', 0xFFCC00);
            await interacao.editReply({
                components: [containerErro],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }
    } catch (erro) {
        await responderComErro(interacao, erro, 'Ocorreu um erro ao tentar remover o aviso do banco de dados.');
    }
}

async function tratarComandoDeChat(interacao, cliente) {
    const comando = cliente.commands.get(interacao.commandName);
    if (!comando) {
        return responderComErro(interacao, new Error(`O comando "${interacao.commandName}" não foi encontrado ou está desativado.`));
    }

    try {
        if (interacao.commandName === 'sugerir') {
            const config = await SuggestionConfig.findOne({ guildId: interacao.guild.id });
            if (!config || !config.active || !config.channelId) {
                const containerInativo = new ContainerBuilder()
                    .setAccentColor(0xFEE75C)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("## Hornet System | Sugestão\n\nO sistema de sugestões está **desativado** ou **não foi configurado** neste servidor. Para que os membros possam enviar suas ideias, um administrador precisa ativar e definir um canal para recebê-las.\n\n**Ação para Administradores:**\nUtilize o comando de configuração (geralmente `/setup sugestao`) para designar um canal e ativar o sistema.")
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

                return interacao.reply({
                    components: [containerInativo],
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
                });
            }
        }
        if (interacao.commandName === 'warn' || interacao.commandName === 'warnpainel') {
             const config = await verificarWarnConfig(interacao.guild.id);
             if (!config) {
                 const containerInativo = new ContainerBuilder()
                    .setAccentColor(0xFEE75C)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("## Sentinel System | Warn Configuração\n\nO sistema de avisos está **desativado** ou **não foi configurado** neste servidor. Para utilizar esta funcionalidade, um administrador precisa configurar os cargos e ativar o sistema.\n\n**Ação para Administradores:**\nUtilize o comando de configuração `/warnconfig` para definir os cargos de punição e ativar o módulo.")
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

                return interacao.reply({
                    components: [containerInativo],
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
                });
             }
        }
        await comando.execute(interacao, cliente);
    } catch (erro) {
        await responderComErro(interacao, erro, 'Ocorreu um erro inesperado ao tentar executar este comando.');
    }
}

async function tratarMenuSelecaoItem(interacao, jogo) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });
    let tipo;
    const configJogo = CONFIGURACAO_PAINEL_ADMIN[jogo];
    if (configJogo) {
        tipo = Object.keys(configJogo.configItem).find(key => interacao.customId === configJogo.configItem[key].idMenuSelecao);
    }

    if (!tipo) {
        const erro = new Error(`Tipo de item não reconhecido para o customId: ${interacao.customId}`);
        return responderComErro(interacao, erro, 'Ocorreu um erro interno. Tipo de item desconhecido.');
    }

    const config = configJogo.configItem[tipo];
    const idItem = interacao.values[0];
    const item = await config.modelo.findOne({ _id: idItem, guildId: interacao.guild.id });

    if (!item) {
        return responderComErro(interacao, new Error(`Item com ID '${idItem}' não encontrado para o tipo '${tipo}'.`), `Este(a) **${config.nome}** não foi encontrado(a). Pode ter sido removido(a).`);
    }

    if (item.jsonEmbed) {
        try {
            const placeholders = {
                '{user.mention}': `<@${interacao.user.id}>`,
                '{user.name}': interacao.user.username,
                '{item.title}': item.title,
                '{item.description}': item.description || 'Sem descrição.'
            };
            const containerPersonalizado = criarContainerDeJson(item.jsonEmbed, placeholders);

            await interacao.editReply({
                components: [containerPersonalizado],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        } catch (erro) {
            return responderComErro(interacao, erro, `Não foi possível processar o container personalizado. O JSON pode estar malformado.`);
        }
    } else if (item.link) {
        const containerSucesso = criarContainerResposta(
            `✅ ${config.nome} Selecionado(a)!`,
            `Olá <@${interacao.user.id}>, você escolheu **${item.title}**!\n\n**Link para Download:**\n${item.link}\n\n*Obrigado por apoiar nosso servidor!*`,
            config.corPrimaria
        );
        await interacao.editReply({
            components: [containerSucesso],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    } else {
        const containerSemConteudo = criarContainerResposta('<:Warn:1443744438810841088> Item Vazio', `Este item (**${item.title}**) não possui link ou embed configurado.`, 0xFFCC00);
        await interacao.editReply({
            components: [containerSemConteudo],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }
}

async function processarAdicaoItem(interacao, tipo, jogo, eJson = false) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });
    const {
        fields
    } = interacao;
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];

    const contagemItens = await config.modelo.countDocuments({ guildId: interacao.guild.id });
    if (contagemItens >= 24) {
        const containerLimite = criarContainerResposta('Sentinel System | Limite Atingido', `O limite máximo de 24 ${config.nomePlural} foi atingido. Remova um item antes de adicionar um novo.`, 0xFFCC00);
        return interacao.editReply({
            components: [containerLimite],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    }

    const titulo = fields.getTextInputValue('item_titulo').trim();
    const descricaoInput = fields.getTextInputValue('item_descricao').trim();

    if (titulo.length > 100) {
        return responderComErro(interacao, new Error('Título muito longo.'), 'O título excede o limite de 100 caracteres.');
    }

    if (!titulo) {
        return responderComErro(interacao, new Error('Título vazio fornecido.'), 'O título não pode estar vazio.');
    }

    const itemExistente = await config.modelo.findOne({
        guildId: interacao.guild.id,
        title: {
            $regex: new RegExp(`^${titulo}$`, 'i'),
        },
    });
    if (itemExistente) {
        return responderComErro(interacao, new Error(`Título duplicado: "${titulo}"`), `Um item com o título **"${titulo}"** já existe nesta categoria.`);
    }

    const ultimoItem = await config.modelo.findOne({ guildId: interacao.guild.id }).sort({
        position: -1
    }).limit(1);
    const novaPosicao = ultimoItem && typeof ultimoItem.position === 'number' ? ultimoItem.position + 1 : contagemItens + 1;

    const dadosItem = {
        guildId: interacao.guild.id,
        title: titulo,
        position: novaPosicao,
        emoji: fields.getTextInputValue('item_emoji') || null,
        description: descricaoInput || "Item adicionado.",
    };

    const containersParaResposta = [];

    if (eJson) {
        const inputJson = fields.getTextInputValue('item_json');
        try {
            const containerPreview = criarContainerDeJson(inputJson, {
                '{item.title}': `[PRÉ-VISUALIZAÇÃO] ${titulo}`
            });
            containersParaResposta.push(containerPreview);
            dadosItem.jsonEmbed = inputJson;
            dadosItem.link = null;
        } catch (erro) {
            return responderComErro(interacao, erro, `O JSON fornecido é inválido. Verifique a sintaxe.`);
        }
    } else {
        dadosItem.link = fields.getTextInputValue('item_link');
        dadosItem.jsonEmbed = null;
    }

    try {
        await new config.modelo(dadosItem).save();
        await enviarLogAdicaoItem(interacao, tipo, dadosItem);

        const containerSucesso = criarContainerResposta('Sentinel System | Sucesso!', `O item **"${titulo}"** foi adicionado ao catálogo de **${config.nomePlural}**!`, 0x57F287);
        containersParaResposta.unshift(containerSucesso);

        await interacao.editReply({
            components: containersParaResposta,
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    } catch (erroDB) {
        return responderComErro(interacao, erroDB, 'Ocorreu um erro ao salvar o item no banco de dados.');
    }
}

async function processarRemocaoItem(interacao, tipo, jogo, idItem) {
    await interacao.deferUpdate();
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];

    try {
        const itemParaRemover = await config.modelo.findById(idItem);

        if (!itemParaRemover) {
            return responderComErro(interacao, new Error(`Item não encontrado para remoção: ID "${idItem}"`), `O item selecionado não foi encontrado. Pode já ter sido removido.`);
        }

        await config.modelo.deleteOne({
            _id: itemParaRemover._id
        });

        if (typeof itemParaRemover.position === 'number') {
            await config.modelo.updateMany({
                guildId: interacao.guild.id,
                position: {
                    $gt: itemParaRemover.position
                }
            }, {
                $inc: {
                    position: -1
                }
            });
        }

        const containerSucesso = new ContainerBuilder()
            .setAccentColor(0x57F287)
            .addSectionComponents(
                new SectionBuilder()
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`## Sentinel System | Sucesso!\n\nO item "**${itemParaRemover.title}**" foi removido permanentemente do catálogo.`)
                )
            );

        await interacao.editReply({
            components: [containerSucesso],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    } catch (erroDB) {
        return responderComErro(interacao, erroDB, 'Ocorreu um erro ao remover o item do banco de dados.');
    }
}

async function processarEdicaoItem(interacao, tipo, jogo, idItem) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });
    const {
        fields
    } = interacao;
    const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];

    const titulo = fields.getTextInputValue('item_titulo_editar').trim();
    const descricao = fields.getTextInputValue('item_descricao_editar').trim() || null;
    const inputJson = fields.getTextInputValue('item_json_editar').trim();
    const emoji = fields.getTextInputValue('item_emoji_editar').trim() || null;
    const inputPosicao = fields.getTextInputValue('item_posicao_editar').trim();
    const novaPosicao = parseInt(inputPosicao, 10);

    const totalItens = await config.modelo.countDocuments({ guildId: interacao.guild.id });
    if (isNaN(novaPosicao) || novaPosicao < 1 || novaPosicao > totalItens) {
        return responderComErro(interacao, new Error('Número de posição inválido.'), `A posição deve ser um número entre 1 e ${totalItens}.`);
    }

    if (!titulo) {
        return responderComErro(interacao, new Error('Título de edição vazio.'), 'O título não pode estar vazio.');
    }
    if (!inputJson) {
        return responderComErro(interacao, new Error('JSON de edição vazio.'), 'O campo JSON não pode estar vazio.');
    }

    const itemExistente = await config.modelo.findOne({
        guildId: interacao.guild.id,
        title: {
            $regex: new RegExp(`^${titulo}$`, 'i')
        },
        _id: {
            $ne: idItem
        },
    });

    if (itemExistente) {
        return responderComErro(interacao, new Error(`Título de edição duplicado: "${titulo}"`), `Outro item com o título **"${titulo}"** já existe.`);
    }

    try {
        JSON.parse(inputJson);
    } catch (erro) {
        return responderComErro(interacao, erro, `O JSON fornecido é inválido. Verifique a sintaxe.`);
    }

    try {
        const itemParaMover = await config.modelo.findOne({ _id: idItem, guildId: interacao.guild.id });
        if (!itemParaMover) {
            return responderComErro(interacao, new Error(`Item ID ${idItem} não encontrado para atualização.`), 'Não foi possível encontrar o item para atualizar.');
        }
        const antigaPosicao = itemParaMover.position;

        if (antigaPosicao && novaPosicao !== antigaPosicao) {
            if (novaPosicao < antigaPosicao) {
                await config.modelo.updateMany({
                    guildId: interacao.guild.id,
                    position: {
                        $gte: novaPosicao,
                        $lt: antigaPosicao
                    }
                }, {
                    $inc: {
                        position: 1
                    }
                });
            } else {
                await config.modelo.updateMany({
                    guildId: interacao.guild.id,
                    position: {
                        $gt: antigaPosicao,
                        $lte: novaPosicao
                    }
                }, {
                    $inc: {
                        position: -1
                    }
                });
            }
        }

        await config.modelo.findByIdAndUpdate(
            idItem, {
                title: titulo,
                description: descricao,
                jsonEmbed: inputJson,
                emoji,
                link: null,
                position: novaPosicao,
            }, {
                new: true
            }
        );

        const containerPreview = criarContainerDeJson(inputJson, {
            '{item.title}': `[PRÉ-VISUALIZAÇÃO ATUALIZADA] ${titulo}`
        });
        const containerSucesso = criarContainerResposta('Sentinel System | Sucesso!', `O item **"${titulo}"** foi atualizado com sucesso!`, 0x57F287);

        await interacao.editReply({
            components: [containerSucesso, containerPreview],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });
    } catch (erroDB) {
        return responderComErro(interacao, erroDB, 'Ocorreu um erro ao atualizar o item no banco de dados.');
    }
}

async function tratarSelecaoCanal(interacao, tipo, jogo) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const idCanal = interacao.values[0];
    const canal = interacao.guild.channels.cache.get(idCanal);

    if (!canal || canal.type !== ChannelType.GuildText) {
        return responderComErro(interacao, new Error('Canal inválido selecionado.'), 'O canal selecionado não é um canal de texto válido.');
    }

    try {
        if (jogo === 'ports') {
            const containerHub = criarContainerHubDeArquivo('config/hubs/ports.json');

            containerHub.addActionRowComponents(linha =>
                linha.addComponents(
                    new ButtonBuilder().setCustomId('mostrar_ports_workshop').setLabel('Porting Workshop').setStyle(ButtonStyle.Secondary).setEmoji('<:knightromantic:1441118908999401516>'),
                    new ButtonBuilder().setCustomId('mostrar_ports_weave').setLabel('Weave Wing').setStyle(ButtonStyle.Secondary).setEmoji('<:knightily:1441118889860661460>'),
                    new ButtonBuilder().setCustomId('mostrar_ports_gle').setLabel('GLE Ports').setStyle(ButtonStyle.Secondary).setEmoji('<:knightparty:1441118904163369076>')
                )
            );

            await canal.send({
                components: [containerHub],
                flags: MessageFlags.IsComponentsV2
            });

            const containerSucesso = criarContainerResposta('Sentinel System | Postado!', `O Hub de Ports de Silksong foi postado em <#${canal.id}>!`, 0x57F287);
            return await interacao.editReply({
                components: [containerSucesso],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        if (jogo === 'knight_ports') {
            const containerHub = criarContainerHubDeArquivo('config/hubs/knight_ports.json');

            containerHub.addActionRowComponents(linha =>
                linha.addComponents(
                    new ButtonBuilder().setCustomId('mostrar_knight_ports_dann').setLabel('Dan Cooper').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
                    new ButtonBuilder().setCustomId('mostrar_knight_ports_gle').setLabel('GLE Ports').setStyle(ButtonStyle.Secondary).setEmoji('🍏')
                )
            );

            await canal.send({
                components: [containerHub],
                flags: MessageFlags.IsComponentsV2
            });

            const containerSucesso = criarContainerResposta('Sentinel System | Postado!', `O Hub de Ports de Hollow Knight foi postado em <#${canal.id}>!`, 0x57F287);
            return await interacao.editReply({
                components: [containerSucesso],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];
        
        const caminhoArquivoHub = `config/hubs/${jogo}_${tipo}.json`;
        let containerHub;
        try {
            containerHub = criarContainerHubDeArquivo(caminhoArquivoHub);
        } catch (error) {
            return responderComErro(interacao, error, `Não foi possível carregar o arquivo de configuração para o hub de ${config.nomePlural}. Verifique se o arquivo \`${caminhoArquivoHub}\` existe e está formatado corretamente.`);
        }

        const itens = await config.modelo.find({ guildId: interacao.guild.id }).sort({
            position: 1
        }).limit(24);

        if (itens.length > 0) {
            const opcoes = await Promise.all(
                itens.map(async (item) => {
                    const opcao = {
                        label: truncarString(item.title, 100),
                        description: item.description ? truncarString(item.description, 100) : 'Nenhuma descrição disponível.',
                        value: item._id.toString(),
                    };

                    const emojiValido = await validarECorrigirEmoji(item.emoji, config.modelo, item._id);
                    const emojiExibicao = emojiValido || analisarEmojiDiscord(config.emoji);

                    if (emojiExibicao) {
                        opcao.emoji = emojiExibicao;
                    }

                    return opcao;
                })
            );

            const menuSelecao = new StringSelectMenuBuilder()
                .setCustomId(config.idMenuSelecao)
                .setPlaceholder(truncarString(`Selecione um(a) ${config.nome} para ver detalhes!`, 150))
                .addOptions(opcoes);
            
            containerHub.addActionRowComponents(linha => linha.addComponents(menuSelecao));
        }

        await canal.send({
            components: [containerHub],
            flags: MessageFlags.IsComponentsV2
        });

        const containerSucesso = criarContainerResposta('Sentinel System | Postado!', `O hub de ${config.nomePlural} foi postado em <#${canal.id}>!`, 0x57F287);
        await interacao.editReply({
            components: [containerSucesso],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });

    } catch (erroPostagem) {
        return responderComErro(interacao, erroPostagem, 'Não foi possível postar a mensagem no canal selecionado. Verifique minhas permissões.');
    }
}

async function tratarDefinirCanalLogs(interacao) {
    await interacao.deferReply({
        flags: MessageFlags.Ephemeral
    });

    const idCanal = interacao.values[0];
    const canal = interacao.guild.channels.cache.get(idCanal);

    if (!canal || canal.type !== ChannelType.GuildText) {
        return responderComErro(interacao, new Error('Canal de log inválido.'), 'O canal selecionado não é um canal de texto válido.');
    }

    try {
        await LogChannel.findOneAndUpdate({
            guildId: interacao.guild.id
        }, {
            channelId: canal.id
        }, {
            upsert: true,
            new: true
        });

        const containerSucesso = criarContainerResposta(
            'Sentinel System | Logs Configurados',
            `O canal de logs foi definido para <#${canal.id}>! Todas as novas adições serão registradas lá.`,
            0x57F287
        );
        await interacao.editReply({
            components: [containerSucesso],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
        });

    } catch (erroDB) {
        return responderComErro(interacao, erroDB, 'Ocorreu um erro ao salvar a configuração no banco de dados.');
    }
}

async function tratarComponenteDeMensagem(interacao) {
    const {
        componentType
    } = interacao;

    if (componentType === ComponentType.Button) {

        if (interacao.customId === 'cancelar_remocao') {
            await interacao.deferUpdate();
            const containerCancelado = criarContainerResposta('Operação Cancelada', 'A remoção do item foi cancelada com sucesso.', 0x5865F2);
            await interacao.editReply({
                components: [containerCancelado],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('confirmar_remocao_')) {
            const [_, __, tipo, ...partesJogoComId] = interacao.customId.split('_');
            const idItem = partesJogoComId.pop();
            const jogo = partesJogoComId.join('_');
            await processarRemocaoItem(interacao, tipo, jogo, idItem);
            return;
        }

        if (interacao.customId === 'sugestao_desativar_canal') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const containerConfirm = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(interacao.user.displayAvatarURL({
                        dynamic: true
                    })))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent("## <:Star:1441118708981563522> Confirmação de Desativação\n\nVocê está prestes a desativar o sistema de sugestões neste servidor. Ao confirmar, novas sugestões não poderão ser enviadas e o canal configurado será removido do registro.\n\n**Tem certeza que deseja prosseguir?**")
                    )
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('sugestao_confirmar_desativar').setLabel('Sim, Desativar').setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('sugestao_cancelar_desativar').setLabel('Cancelar').setStyle(ButtonStyle.Secondary)
                    )
                );

            await interacao.editReply({
                components: [containerConfirm],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'sugestao_confirmar_desativar') {
            await interacao.deferUpdate();
            try {
                await SuggestionConfig.findOneAndUpdate({
                    guildId: interacao.guild.id
                }, {
                    active: false,
                    channelId: null
                }, {
                    upsert: true
                });

                const containerSucesso = criarContainerResposta(
                    'Sentinel Management | Sistema Desativado',
                    'O sistema de sugestões foi desativado com sucesso. O canal foi desvinculado.',
                    0xED4245
                );
                await interacao.editReply({
                    components: [containerSucesso],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (err) {
                await responderComErro(interacao, err, "Falha ao desativar o sistema de sugestões.");
            }
            return;
        }

        if (interacao.customId === 'sugestao_cancelar_desativar') {
            await interacao.deferUpdate();
            const containerCancelado = criarContainerResposta('Operação Cancelada', 'O sistema de sugestões permanece ativo e configurado.', 0x5865F2);
            await interacao.editReply({
                components: [containerCancelado],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('sugestao_votar_')) {
            const parts = interacao.customId.split('_');
            const tipoVoto = parts[2];
            const suggestionId = parts[3];

            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const suggestion = await Suggestion.findById(suggestionId);
            if (!suggestion) {
                return interacao.editReply({
                    components: [criarContainerResposta('Erro', 'Sugestão não encontrada.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            if (suggestion.status !== 'Pending') {
                return interacao.editReply({
                    components: [criarContainerResposta('Votação Encerrada', 'Esta sugestão já foi finalizada.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const votoExistenteIndex = suggestion.voters.findIndex(v => v.userId === interacao.user.id);

            if (votoExistenteIndex !== -1) {
                const votoAnterior = suggestion.voters[votoExistenteIndex];

                if (votoAnterior.voteType === tipoVoto) {
                    return interacao.editReply({
                        components: [criarContainerResposta('Aviso', 'Você já votou nesta opção! 🔒\nSeu voto está registrado e não pode ser removido, apenas alterado para a opção oposta.', 0xFFA500)],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                } else {
                    suggestion.voters[votoExistenteIndex].voteType = tipoVoto;
                    suggestion.voters[votoExistenteIndex].timestamp = new Date();
                    await suggestion.save();
                    return interacao.editReply({
                        components: [criarContainerResposta('Voto Alterado', `Seu voto foi alterado para **${tipoVoto === 'up' ? 'Concordo' : 'Discordo'}**.`, 0x5865F2)],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                }
            }

            suggestion.voters.push({
                userId: interacao.user.id,
                voteType: tipoVoto,
                timestamp: new Date()
            });

            await suggestion.save();

            const msgSucesso = tipoVoto === 'up' ?
                'Você concordou com essa sugestão! <a:Grenn:1443742656462061568>' :
                'Você discordou dessa sugestão. <a:Red:1443742654650388501>';

            const containerSucessoVoto = criarContainerResposta('Voto Registrado', msgSucesso, tipoVoto === 'up' ? 0x57F287 : 0xED4245);

            return interacao.editReply({
                components: [containerSucessoVoto],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }


        if (interacao.customId.startsWith('sugestao_aprovar_') || interacao.customId.startsWith('sugestao_rejeitar_')) {
            const parts = interacao.customId.split('_');
            const action = parts[1];
            const suggestionId = parts[2];

            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const suggestion = await Suggestion.findById(suggestionId);
            if (!suggestion) {
                return interacao.editReply({
                    components: [criarContainerResposta('Erro', 'Sugestão não encontrada.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            if (suggestion.status !== 'Pending') {
                return interacao.editReply({
                    components: [criarContainerResposta('Aviso', `Esta sugestão já foi processada como **${suggestion.status}**.`, 0xFFA500)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const title = action === 'aprovar' ? 'Aprovar Sugestão' : 'Rejeitar Sugestão';
            const color = action === 'aprovar' ? 0x57F287 : 0xED4245;
            const desc = `Você está prestes a **${action.toUpperCase()}** a sugestão de <@${suggestion.userId}>.\n\n**Conteúdo:**\n${truncarString(suggestion.content, 200)}\n\nDeseja confirmar esta ação?`;

            const containerConfirm = new ContainerBuilder()
                .setAccentColor(color)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(interacao.user.displayAvatarURL({
                        dynamic: true
                    })))
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`## ${title}\n${desc}`))
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId(`sugestao_confirmar_${action}_${suggestionId}`).setLabel('Confirmar').setStyle(action === 'aprovar' ? ButtonStyle.Success : ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('sugestao_cancelar_acao').setLabel('Cancelar').setStyle(ButtonStyle.Secondary)
                    )
                );

            await interacao.editReply({
                components: [containerConfirm],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('sugestao_confirmar_')) {
            const parts = interacao.customId.split('_');
            const action = parts[2];
            const suggestionId = parts[3];

            await interacao.deferUpdate();

            try {
                const newStatus = action === 'aprovar' ? 'Approved' : 'Rejected';
                const suggestion = await Suggestion.findByIdAndUpdate(suggestionId, {
                    status: newStatus,
                    moderatorId: interacao.user.id
                }, {
                    new: true
                });

                if (suggestion && suggestion.messageId && suggestion.channelId) {
                    try {
                        const channel = await interacao.guild.channels.fetch(suggestion.channelId);
                        if (channel) {
                            const msg = await channel.messages.fetch(suggestion.messageId);
                            if (msg) {
                                const autorSugestao = await interacao.client.users.fetch(suggestion.userId).catch(() => ({
                                    username: 'Usuário Desconhecido',
                                    displayAvatarURL: () => THUMBNAIL_URL
                                }));

                                const newColor = action === 'aprovar' ? 0x57F287 : 0xED4245;
                                const statusText = action === 'aprovar' ? 'Aprovada<a:Ok:1441118699640717322>' : 'Rejeitada <a:Error:1441118696692256871>';
                                const footerText = action === 'aprovar' ? `Aprovado por ${interacao.user.tag}` : `Rejeitado por ${interacao.user.tag}`;

                                const containerUpdated = new ContainerBuilder()
                                    .setAccentColor(newColor)
                                    .addSectionComponents(
                                        new SectionBuilder()
                                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(autorSugestao.displayAvatarURL({
                                            dynamic: true,
                                            size: 256
                                        }) || THUMBNAIL_URL))
                                        .addTextDisplayComponents(
                                            new TextDisplayBuilder()
                                            .setContent(`## <:Icon_NewRelease:1427138810629591124> **System Sugestão**\n\n- **Usuário:** <@${suggestion.userId}>\n- **Sugestão:**\n${suggestion.content}\n- **Sugestão Status :** ${statusText}`)
                                        )
                                    )
                                    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
                                    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`ID da Sugestão: ${suggestion._id}\n${footerText}`));

                                await msg.edit({
                                    components: [containerUpdated],
                                    flags: MessageFlags.IsComponentsV2
                                });
                            }
                        }
                    } catch (e) {
                        console.error("Falha ao atualizar mensagem original da sugestão:", e);
                    }
                }

                const containerFinal = criarContainerResposta(
                    'Sucesso',
                    `A sugestão foi **${newStatus === 'Approved' ? 'APROVADA' : 'REJEITADA'}** com sucesso e os botões foram removidos.`,
                    action === 'aprovar' ? 0x57F287 : 0xED4245
                );

                await interacao.editReply({
                    components: [containerFinal],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });

            } catch (err) {
                await responderComErro(interacao, err, "Erro ao processar a sugestão.");
            }
            return;
        }

        if (interacao.customId === 'sugestao_cancelar_acao') {
            await interacao.deferUpdate();
            await interacao.editReply({
                components: [criarContainerResposta('Cancelado', 'Ação cancelada.', 0x5865F2)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('sugestao_votos_')) {
            const suggestionId = interacao.customId.split('_')[2];
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const suggestion = await Suggestion.findById(suggestionId);
            if (!suggestion || !suggestion.voters || suggestion.voters.length === 0) {
                return interacao.editReply({
                    components: [criarContainerResposta('Sem Votos', 'Ninguém votou nesta sugestão ainda.', 0xFFA500)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const votersToShow = suggestion.voters.slice(0, 25);
            const options = await Promise.all(votersToShow.map(async (v) => {
                const user = await interacao.client.users.fetch(v.userId).catch(() => ({
                    username: 'Unknown'
                }));
                return {
                    label: user.username,
                    description: v.voteType === 'up' ? 'Votou Sim (Favorável)' : 'Votou Não (Contra)',
                    value: v.userId,
                    emoji: v.voteType === 'up' ? '<a:Grenn:1443742656462061568>' : '<a:Red:1443742654650388501>'
                };
            }));

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`sugestao_ver_detalhe_voto_${suggestionId}`)
                .setPlaceholder('Selecione um usuário para ver detalhes...')
                .addOptions(options);

            const containerVoters = new ContainerBuilder()
                .setAccentColor(0x5865F2)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`## Quem Votou Nesta Sugestão\n\nAbaixo está a lista dos últimos ${options.length} usuários que votaram nesta proposta. Selecione um nome para ver os detalhes completos do voto.`))
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(new ActionRowBuilder().addComponents(selectMenu));

            await interacao.editReply({
                components: [containerVoters],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('aposta_entrar_') || interacao.customId.startsWith('aposta_sair_')) {
            return;
        }

        if (interacao.customId === 'traduzir_escolher_idioma') {
            return await mostrarSelecaoIdioma(interacao, 0);
        }
        if (interacao.customId.startsWith('traduzir_pagina_')) {
            if (interacao.customId === 'traduzir_info_pagina') return;
            const pagina = parseInt(interacao.customId.split('_')[2], 10);
            return await mostrarSelecaoIdioma(interacao, pagina);
        }

        if (interacao.customId === 'traduzir_mensagem') {
            const agora = Date.now();
            const tempoExpiracao = cooldownsTraducao.get(interacao.user.id);

            if (tempoExpiracao && agora < tempoExpiracao) {
                const tempoRestante = Math.ceil((tempoExpiracao - agora) / 1000);
                const containerCooldown = criarContainerResposta(
                    'Sentinel System | Cooldown Ativo',
                    `Por favor, aguarde mais **${tempoRestante} segundo(s)** antes de traduzir novamente.`,
                    0xFFCC00
                );
                return await interacao.reply({
                    components: [containerCooldown],
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
                });
            }

            cooldownsTraducao.set(interacao.user.id, agora + (SEGUNDOS_COOLDOWN_TRADUCAO * 1000));

            return await realizarTraducao(interacao);
        }

        if (interacao.customId === 'botao_definir_logs') {
            return await mostrarMenuDefinirCanalLogs(interacao);
        }

        if (interacao.customId.startsWith('warn_config_botao_limite_')) {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const limiteEscolhido = parseInt(interacao.customId.split('_')[4]);

            try {
                let config = await WarnConfig.findOne({ guildId: interacao.guild.id });
                if (!config) {
                    config = new WarnConfig({ guildId: interacao.guild.id });
                }

                if (config.maxWarns === limiteEscolhido) {
                     config.maxWarns = 3;
                     config.active = false;
                     await config.save();
                     const containerReset = criarContainerResposta(
                         'Sentinel System | Limite Redefinido',
                         `O limite de avisos foi redefinido para o padrão (3) e o sistema foi colocado em modo de espera (inativo) pois você selecionou a opção atual novamente.`,
                         0xFEE75C
                     );
                     return await interacao.editReply({
                         components: [containerReset],
                         flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                     });
                }

                config.maxWarns = limiteEscolhido;
                config.active = true;
                await config.save();

                const containerSucesso = criarContainerResposta(
                    'Sentinel System | Limite Atualizado',
                    `O limite de banimento foi definido para **${limiteEscolhido} avisos**. O sistema está agora **Ativo**.`,
                    0x57F287
                );
                await interacao.editReply({
                    components: [containerSucesso],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (erro) {
                await responderComErro(interacao, erro, "Falha ao salvar o limite de avisos.");
            }
            return;
        }

        if (interacao.customId === 'warn_config_btn_limpar_cargos') {
            await interacao.deferReply({ flags: MessageFlags.Ephemeral });

            const containerConfirm = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                    new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("## ⚠️ Confirmação Crítica\n\nVocê está prestes a **remover permanentemente** todos os cargos de punição configurados para este servidor.\n\nEsta ação irá:\n- Resetar a hierarquia de avisos para o estado padrão (sem cargos).\n- Não afetará o contador de avisos dos usuários, apenas a aplicação de cargos.\n\n**Tem certeza absoluta que deseja continuar?**")
                        )
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('warn_config_confirm_clear_yes').setLabel('Sim, Resetar').setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('warn_config_confirm_clear_no').setLabel('Não, Cancelar').setStyle(ButtonStyle.Secondary)
                    )
                );

            await interacao.editReply({
                components: [containerConfirm],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'warn_config_confirm_clear_yes') {
            await interacao.deferUpdate();
            try {
                await WarnConfig.findOneAndUpdate(
                    { guildId: interacao.guild.id },
                    { warnRoles: [] },
                    { upsert: true }
                );
                const containerSucesso = criarContainerResposta(
                    'Sentinel System | Reset Concluído',
                    'Todos os cargos de punição foram removidos com sucesso. A hierarquia foi resetada.',
                    0x57F287
                );
                await interacao.editReply({
                    components: [containerSucesso],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (err) {
                await responderComErro(interacao, err, "Falha ao limpar os cargos.");
            }
            return;
        }

        if (interacao.customId === 'warn_config_confirm_clear_no') {
            await interacao.deferUpdate();
            const containerCancel = criarContainerResposta(
                'Operação Cancelada',
                'A remoção de cargos foi cancelada. Nenhuma alteração foi feita.',
                0x5865F2
            );
            await interacao.editReply({
                components: [containerCancel],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('definir_mensagem_personalizada_')) {
            const partes = interacao.customId.split('_');
            const tipo = partes[3];
            const config = CONFIGURACAO_ITEM_PORTS[tipo];

            if (!config) {
                return responderComErro(interacao, new Error(`Tipo de configuração de mensagem personalizada inválido: ${tipo}`), 'Erro de configuração interna.');
            }

            const MapaModelos = {
                freddy: MensagemWorkshop,
                chines: MensagemWeave,
                gleports: MensagemGle
            };
            const Modelo = MapaModelos[tipo];
            const mensagemExistente = await Modelo.findOne({
                guildId: interacao.guild.id
            });
            const jsonAtual = mensagemExistente ? mensagemExistente.jsonMessage : '';

            const modal = new ModalBuilder()
                .setCustomId(`definir_mensagem_personalizada_${tipo}_modal`)
                .setTitle(truncarString(`Msg. Custom para ${config.nome}`, 45));

            const inputJson = new TextInputBuilder()
                .setCustomId('json_mensagem_personalizada')
                .setLabel("JSON do Container da Mensagem")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false);

            if (jsonAtual) {
                inputJson.setValue(jsonAtual.substring(0, 4000));
                inputJson.setPlaceholder('JSON atual carregado. Deixe em branco para remover.');
            } else {
                inputJson.setPlaceholder('Cole seu JSON de container válido aqui. Deixe em branco para remover.');
            }

            modal.addComponents(
                new ActionRowBuilder().addComponents(inputJson)
            );

            return await interacao.showModal(modal);
        }

        if (interacao.customId.startsWith('aviso_')) {
            const partes = interacao.customId.split('_');
            const acao = partes[1];
            const idUsuarioAlvo = partes[2];

            const membroAlvo = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
            if (!membroAlvo) {
                const containerErro = criarContainerResposta('Sentinel System | Erro', 'O usuário selecionado não foi encontrado neste servidor.', 0xED4245);
                return interacao.reply({
                    components: [containerErro],
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                });
            }

            switch (acao) {
                case 'adicionar': {
                    const modal = new ModalBuilder()
                        .setCustomId(`aviso_adicionar_modal_${idUsuarioAlvo}`)
                        .setTitle(truncarString(`Adicionar Aviso para ${membroAlvo.user.username}`, 45))
                        .addComponents(
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                .setCustomId('input_motivo_aviso')
                                .setLabel(truncarString('Motivo do Aviso', 45))
                                .setStyle(TextInputStyle.Paragraph)
                                .setPlaceholder('Ex: Spam no chat geral.')
                                .setRequired(true)
                            )
                        );
                    await interacao.showModal(modal);
                    break;
                }
                case 'remover': {
                    await interacao.deferReply({
                        flags: MessageFlags.Ephemeral
                    });
                    const avisos = await Warn.find({
                        guildId: interacao.guild.id,
                        userId: idUsuarioAlvo
                    });
                    if (!avisos.length) {
                        const containerSemAvisos = criarContainerResposta('Sentinel System | Sem Avisos', 'Este usuário não possui avisos para remover.', 0x5865F2);
                        return interacao.editReply({
                            components: [containerSemAvisos],
                            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                        });
                    }
                    const opcoes = avisos.map((aviso, index) => ({
                        label: truncarString(`Aviso #${index + 1}: ${aviso.reason}`, 100),
                        description: `Em ${aviso.timestamp.toLocaleDateString()}`,
                        value: aviso._id.toString(),
                    }));
                    const menuSelecao = new StringSelectMenuBuilder()
                        .setCustomId('aviso_remover_selecao')
                        .setPlaceholder(truncarString('Selecione o aviso a ser removido', 150))
                        .addOptions(opcoes);

                    const containerRemocao = new ContainerBuilder()
                        .setAccentColor(0xDE4B52)
                        .addSectionComponents(
                            new SectionBuilder()
                            .setThumbnailAccessory(new ThumbnailBuilder().setURL(membroAlvo.user.displayAvatarURL({
                                dynamic: true
                            })))
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent(`## Sentinel System | Remoção de Aviso\nSelecione qual aviso você deseja remover para o usuário <@${membroAlvo.id}>.\nAtualmente, ele(a) possui **${avisos.length}** aviso(s).`)
                            )
                        )
                        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                        .addActionRowComponents(new ActionRowBuilder().addComponents(menuSelecao));

                    await interacao.editReply({
                        components: [containerRemocao],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                    break;
                }
                case 'historico': {
                    await tratarPaginacaoHistoricoAvisos(interacao);
                    break;
                }
                case 'banir':
                case 'expulsar': {
                    const permNecessaria = acao === 'banir' ? PermissionsBitField.Flags.BanMembers : PermissionsBitField.Flags.KickMembers;
                    if (!interacao.member.permissions.has(permNecessaria)) {
                        const containerPerm = criarContainerResposta('Sentinel System | Permissão Negada', `Você não tem a permissão necessária de \`${acao === 'banir' ? 'Banir Membros' : 'Expulsar Membros'}\`.`, 0xED4245);
                        return interacao.reply({
                            components: [containerPerm],
                            flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
                        });
                    }
                    await interacao.deferReply({
                        flags: MessageFlags.Ephemeral
                    });
                    const textoAcao = acao;
                    const containerConfirmacao = criarContainerResposta(
                        `Sentinel System | Confirmação`,
                        `Você tem certeza que quer **${textoAcao}** o usuário <@${membroAlvo.id}>? Esta ação é irreversível.`,
                        0xFFCC00
                    );
                    const botoesConfirmacao = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId(`confirmar_${acao}_${idUsuarioAlvo}`).setLabel('Sim, confirmar').setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId(`cancelar_${acao}_${idUsuarioAlvo}`).setLabel('Não, cancelar').setStyle(ButtonStyle.Secondary)
                    );
                    containerConfirmacao.addActionRowComponents(botoesConfirmacao);

                    await interacao.editReply({
                        components: [containerConfirmacao],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                    break;
                }
                case 'mutar': {
                    if (!interacao.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                        const containerPerm = criarContainerResposta('Sentinel System | Permissão Negada', `Você não tem a permissão necessária de \`Moderar Membros\`.`, 0xED4245);
                        return interacao.reply({
                            components: [containerPerm],
                            flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
                        });
                    }
                    const modal = new ModalBuilder()
                        .setCustomId(`aviso_mutar_modal_${idUsuarioAlvo}`)
                        .setTitle(truncarString(`Mutar ${membroAlvo.user.username}`, 45))
                        .addComponents(
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                .setCustomId('input_duracao_mute_aviso')
                                .setLabel(truncarString('Duração (ex: 10m, 1h, 2d)', 45))
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('Ex: 30m para 30 minutos')
                                .setRequired(true)
                            ),
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                .setCustomId('input_motivo_mute_aviso')
                                .setLabel(truncarString('Motivo (Opcional)', 45))
                                .setStyle(TextInputStyle.Short)
                                .setRequired(false)
                            )
                        );
                    await interacao.showModal(modal);
                    break;
                }
            }
            return;
        }

        if (interacao.customId.startsWith('confirmar_') || interacao.customId.startsWith('cancelar_')) {
            await interacao.deferUpdate();
            const partes = interacao.customId.split('_');
            const decisao = partes[0];
            const acao = partes[1];
            const idUsuarioAlvo = partes[2];

            if (decisao === 'cancelar') {
                const containerCancelado = criarContainerResposta('Sentinel System | Ação Cancelada', 'A operação foi cancelada com sucesso.', 0x57F287);
                await interacao.editReply({
                    components: [containerCancelado],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
                return;
            }

            const membroAlvo = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
            if (!membroAlvo) {
                const containerErro = criarContainerResposta('Sentinel System | Erro', 'O usuário saiu do servidor antes da conclusão da ação.', 0xED4245);
                return interacao.editReply({
                    components: [containerErro],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const textoAcao = acao === 'banir' ? 'banido' : 'expulso';
            const permNecessaria = acao === 'banir' ? PermissionsBitField.Flags.BanMembers : PermissionsBitField.Flags.KickMembers;

            if (!interacao.member.permissions.has(permNecessaria)) {
                const containerPerm = criarContainerResposta('Sentinel System | Permissão Negada', `Você não tem a permissão necessária para realizar esta ação.`, 0xED4245);
                return interacao.editReply({
                    components: [containerPerm],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }
            if (!interacao.guild.members.me.permissions.has(permNecessaria)) {
                const containerPermBot = criarContainerResposta('Sentinel System | Permissão Faltando', `Eu não tenho permissão para **${acao} membros**.`, 0xED4245);
                return interacao.editReply({
                    components: [containerPermBot],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            try {
                if (acao === 'banir') {
                    await membroAlvo.ban({
                        reason: `Banido por ${interacao.user.tag} via Painel de Avisos.`
                    });
                } else {
                    await membroAlvo.kick(`Expulso por ${interacao.user.tag} via Painel de Avisos.`);
                }
                const containerSucesso = criarContainerResposta('Sentinel System | Sucesso', `O usuário <@${membroAlvo.id}> foi **${textoAcao}** com sucesso.`, 0x57F287);
                await interacao.editReply({
                    components: [containerSucesso],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (erro) {
                await responderComErro(interacao, erro, `Falha ao ${acao} o membro. Eles podem ter um cargo maior que o meu.`);
            }
            return;
        }

        if (interacao.customId.startsWith('mostrar_ports_') || interacao.customId.startsWith('mostrar_knight_ports_')) {
            let tipoPort, jogo;
            if (interacao.customId.startsWith('mostrar_ports_')) {
                const mapaTipoPort = {
                    'mostrar_ports_workshop': 'freddy',
                    'mostrar_ports_weave': 'chines',
                    'mostrar_ports_gle': 'gleports'
                };
                tipoPort = mapaTipoPort[interacao.customId];
                jogo = 'ports';
            } else {
                tipoPort = interacao.customId.split('_')[3];
                jogo = 'knight_ports';
            }

            if (!tipoPort) return;

            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipoPort];

            if (jogo === 'ports') {
                const MapaModeloMsgPersonalizada = {
                    freddy: MensagemWorkshop,
                    chines: MensagemWeave,
                    gleports: MensagemGle
                };
                const ModeloMsgPersonalizada = MapaModeloMsgPersonalizada[tipoPort];
                const dadosMsgPersonalizada = await ModeloMsgPersonalizada.findOne({
                    guildId: interacao.guild.id
                });

                if (dadosMsgPersonalizada && dadosMsgPersonalizada.jsonMessage) {
                    try {
                        const containerPersonalizado = criarContainerDeJson(dadosMsgPersonalizada.jsonMessage);
                        return await interacao.editReply({
                            components: [containerPersonalizado],
                            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                        });
                    } catch (erro) {
                        return responderComErro(interacao, erro, 'A mensagem personalizada para este painel tem um JSON inválido.');
                    }
                }
            }


            const itens = await config.modelo.find({ guildId: interacao.guild.id }).sort({
                position: 1
            }).limit(24);

            if (itens.length === 0) {
                const containerVazio = new ContainerBuilder()
                    .setAccentColor(0xFFA500)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## <:Warn:1443744438810841088> Aviso Importante\n\n- Desculpe, não encontramos nenhuma versão disponível de **${config.nome}**.\nPor favor, tente mais tarde.`)
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`### 🔔 Notificações de Atualização\n- Deseja ser notificado assim que algum item for adicionado?`)
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                            .setCustomId(`notificar_adicao_${tipoPort}`)
                            .setLabel('Receber Notificações')
                            .setEmoji('<:svsino:1441118776405004299>')
                            .setStyle(ButtonStyle.Secondary)
                        )
                    );

                return interacao.editReply({
                    components: [containerVazio],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const opcoes = itens.map(item => {
                const opcao = {
                    label: truncarString(item.title, 100),
                    description: item.description ? truncarString(item.description, 100) : 'Selecione para ver os detalhes.',
                    value: item._id.toString(),
                };
                const emojiAnalisado = analisarEmojiDiscord(item.emoji || config.emoji);
                if (emojiAnalisado) opcao.emoji = emojiAnalisado;
                return opcao;
            });

            const menuSelecao = new StringSelectMenuBuilder()
                .setCustomId(config.idMenuSelecao)
                .setPlaceholder(`Select a version of ${config.nome}`)
                .addOptions(opcoes);

            const containerMenu = new ContainerBuilder()
                .setAccentColor(config.corPrimaria)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## Select Version\n\nPlease choose the version of **${config.nome}** you wish to download.`)
                    )
                )
                .addActionRowComponents(new ActionRowBuilder().addComponents(menuSelecao));

            return await interacao.editReply({
                components: [containerMenu],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        if (interacao.customId.startsWith('acao_especifica_usuario_')) {
            const idUsuarioAlvo = interacao.customId.split('_')[3];
            if (interacao.user.id !== idUsuarioAlvo) {
                return interacao.reply({
                    content: 'Este botão não é para você!',
                    flags: MessageFlags.Ephemeral
                });
            }
            await interacao.reply({
                content: `✅ Você reivindicou com sucesso sua ação específica de usuário!`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const partesCustomId = interacao.customId.split('_');
        let acao, tipo, jogo;
        const ultimaParte = partesCustomId[partesCustomId.length - 1];

        if (ultimaParte === 'botao') {
            if (partesCustomId[1] === 'json') {
                acao = 'adicionar_json';
                tipo = partesCustomId[2];
                jogo = partesCustomId.slice(3, -1).join('_');
            } else {
                acao = partesCustomId[0];
                tipo = partesCustomId[1];
                jogo = partesCustomId.slice(2, -1).join('_');
            }
        }

        const handlersAcaoBotao = {
            adicionar: mostrarModalAdicionarItem,
            adicionar_json: mostrarModalAdicionarItemJson,
            remover: mostrarHubDelecao,
            postar: postarEmbedHub,
            editar: mostrarMenuSelecaoEditarItem,
            atualizar: async (interacao, tipo, jogo) => {
                await interacao.deferUpdate();
                const novoJogo = jogo === 'silksong' ? 'knight' : 'silksong';
                const configPainelAdminParaJogo = CONFIGURACAO_PAINEL_ADMIN[novoJogo];
                const configItemParaTipo = configPainelAdminParaJogo.configItem[tipo];
                if (!configItemParaTipo) {
                    const err = new Error(`Configuração não encontrada para tipo '${tipo}' no jogo '${novoJogo}'.`);
                    return responderComErro(interacao, err, "Erro de configuração interna.");
                }

                const placeholders = {
                    '{user}': `<@${interacao.user.id}>`,
                    '{user.mention}': `<@${interacao.user.id}>`
                };
                const containerAdmin = criarContainerDeJson(configPainelAdminParaJogo.jsonEmbed, placeholders);

                const botoesAdmin1 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId(`adicionar_${tipo}_${novoJogo}_botao`).setLabel(`Add ${configItemParaTipo.nome}`).setStyle(ButtonStyle.Secondary).setEmoji('<:sv_plus2:1441118777516228809>'),
                    new ButtonBuilder().setCustomId(`adicionar_json_${tipo}_${novoJogo}_botao`).setLabel('Add JSON').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_context_menus:1441118737347383427>'),
                    new ButtonBuilder().setCustomId(`remover_${tipo}_${novoJogo}_botao`).setLabel('Remover').setStyle(ButtonStyle.Secondary).setEmoji('<:lixeira:1441118923889184904>'),
                    new ButtonBuilder().setCustomId(`postar_${tipo}_${novoJogo}_botao`).setLabel('Postar Hub').setStyle(ButtonStyle.Secondary).setEmoji('<:megaphone:1441118767785709806>')
                );

                if (tipo !== 'fusion') {
                    botoesAdmin1.addComponents(
                        new ButtonBuilder().setCustomId(`atualizar_${tipo}_${novoJogo}_botao`).setLabel('Trocar Painel').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_developer_options:1441118740379865282>')
                    );
                }

                const botoesAdmin2 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId(`editar_${tipo}_${novoJogo}_botao`).setLabel('Editar Item').setStyle(ButtonStyle.Secondary).setEmoji('️<:icon_edit:1441118743580377109>'),
                    new ButtonBuilder().setCustomId('botao_definir_logs').setLabel('Configurar Logs').setStyle(ButtonStyle.Secondary).setEmoji('️<:icon_settings:1441118761628467230>')
                );


                containerAdmin
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(botoesAdmin1, botoesAdmin2);

                await interacao.editReply({
                    components: [containerAdmin],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            },
        };

        if (acao && handlersAcaoBotao[acao] && CONFIGURACAO_PAINEL_ADMIN[jogo]) {
            await handlersAcaoBotao[acao](interacao, tipo, jogo);
        } else {
            const jaTratado = interacao.customId.startsWith('aviso_') ||
                interacao.customId.startsWith('confirmar_') ||
                interacao.customId.startsWith('cancelar_') ||
                interacao.customId.startsWith('traduzir_') ||
                interacao.customId.startsWith('mostrar_ports_') ||
                interacao.customId.startsWith('mostrar_knight_ports_') ||
                interacao.customId.startsWith('definir_mensagem_personalizada_') ||
                interacao.customId.startsWith('acao_especifica_usuario_') ||
                interacao.customId.startsWith('notificar_adicao_') ||
                interacao.customId.startsWith('sugestao_') ||
                interacao.customId.startsWith('warn_config_');

            if (!jaTratado && !interacao.replied && !interacao.deferred) {
            }
        }

    } else if (componentType === ComponentType.StringSelect) {

        if (interacao.customId === 'warn_config_menu_principal') {
            const opcao = interacao.values[0];

            if (opcao === 'warn_config_opcao_cargos') {
                await interacao.deferReply({ flags: MessageFlags.Ephemeral });

                const config = await WarnConfig.findOne({ guildId: interacao.guild.id });
                const maxRoles = config && config.maxWarns ? config.maxWarns : 5; // Padrão 5 se não houver config, mas idealmente usa o limite

                const containerCargos = new ContainerBuilder()
                    .setAccentColor(0x5865F2)
                    .addSectionComponents(
                        new SectionBuilder()
                            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent(`## Sentinel System | Definição de Cargos\n\nNesta seção, você deve selecionar os cargos que serão aplicados aos usuários conforme eles recebem avisos.\n\n- **Como funciona:** O sistema segue a ordem de seleção. O primeiro cargo selecionado será aplicado no **1º Aviso**, o segundo no **2º Aviso**, e assim por diante.\n- **Limite Atual:** Você configurou o banimento para ocorrer após **${maxRoles} avisos**. Portanto, você pode selecionar **exatamente** ou **até** ${maxRoles} cargos.\n\n*Para alterar este limite, volte ao menu principal e selecione "Definir Limite de Avisos".*`)
                            )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new RoleSelectMenuBuilder()
                                .setCustomId('warn_config_definir_cargos_select')
                                .setPlaceholder(`Selecione até ${maxRoles} cargos em ordem de gravidade...`)
                                .setMinValues(1)
                                .setMaxValues(maxRoles > 25 ? 25 : maxRoles) // Discord limita a 25, mas aqui limitamos ao maxWarns
                        )
                    )
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('warn_config_btn_limpar_cargos')
                                .setLabel('Resetar Hierarquia')
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji('<:lixeira:1441118923889184904>')
                        )
                    );

                await interacao.editReply({
                    components: [containerCargos],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });

            } else if (opcao === 'warn_config_opcao_limite') {
                await interacao.deferReply({ flags: MessageFlags.Ephemeral });

                const config = await WarnConfig.findOne({ guildId: interacao.guild.id });
                const limiteAtual = config ? config.maxWarns : 3;

                const containerLimite = new ContainerBuilder()
                    .setAccentColor(0x5865F2)
                    .addSectionComponents(
                        new SectionBuilder()
                            .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent(`## Sentinel System | Limite de Banimento\n\nDefina com quantos avisos um usuário deve ser banido automaticamente do servidor.\n\n- **Limite Atual:** ${limiteAtual} avisos.\n- **Funcionamento:** Ao atingir este número, o membro será banido permanentemente.\n- **Desativar:** Clique no botão do número atual novamente para desativar o sistema (resetar para padrão inativo).`)
                            )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('warn_config_botao_limite_1').setLabel('1 Aviso').setStyle(limiteAtual === 1 ? ButtonStyle.Success : ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('warn_config_botao_limite_2').setLabel('2 Avisos').setStyle(limiteAtual === 2 ? ButtonStyle.Success : ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('warn_config_botao_limite_3').setLabel('3 Avisos').setStyle(limiteAtual === 3 ? ButtonStyle.Success : ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('warn_config_botao_limite_4').setLabel('4 Avisos').setStyle(limiteAtual === 4 ? ButtonStyle.Success : ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('warn_config_botao_limite_5').setLabel('5 Avisos').setStyle(limiteAtual === 5 ? ButtonStyle.Success : ButtonStyle.Secondary)
                        )
                    );

                await interacao.editReply({
                    components: [containerLimite],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }
            return;
        }

        if (interacao.customId.startsWith('selecao_remover_')) {
            await interacao.deferUpdate();
            const [_, __, tipo, ...partesJogo] = interacao.customId.split('_');
            const jogo = partesJogo.join('_');
            const idItem = interacao.values[0];

            const config = CONFIGURACAO_PAINEL_ADMIN[jogo]?.configItem[tipo];
            if (!config) {
                return responderComErro(interacao, new Error(`Configuração inválida ao remover: ${jogo}, ${tipo}`), 'Erro interno.');
            }

            const item = await config.modelo.findById(idItem);
            if (!item) {
                return responderComErro(interacao, new Error(`Item ${idItem} não encontrado para deleção.`), 'O item selecionado não existe mais.');
            }

            const containerConfirmacao = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## Sentinel System | Deletar ${item.title}\n\nVocê tem certeza que deseja deletar permanentemente o item "**${item.title}**"? Esta ação não pode ser desfeita e removerá o item do banco de dados e de todas as listas de seleção.`)
                    )
                );

            const linhaBotoes = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId(`confirmar_remocao_${tipo}_${jogo}_${idItem}`)
                .setLabel('Deletar')
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                .setCustomId('cancelar_remocao')
                .setLabel('Cancelar')
                .setStyle(ButtonStyle.Secondary)
            );

            containerConfirmacao.addActionRowComponents(linhaBotoes);

            await interacao.editReply({
                components: [containerConfirmacao],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'sugestao_config_menu_principal') {
            const selected = interacao.values[0];

            if (selected === 'sugestao_config_canal') {
                await interacao.deferReply({
                    flags: MessageFlags.Ephemeral
                });

                const config = await SuggestionConfig.findOne({
                    guildId: interacao.guild.id
                }) || {
                    active: false,
                    channelId: null
                };
                const totalSuggestions = await Suggestion.countDocuments({
                    guildId: interacao.guild.id
                });
                const channelStatus = config.channelId ? `<#${config.channelId}>` : '`Não configurado`';
                const statusIcon = config.active ? '<a:Grenn:1443742656462061568> Ativo' : '<a:Red:1443742654650388501> Inativo';

                const containerConfig = new ContainerBuilder()
                    .setAccentColor(0x5865F2)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(interacao.user.displayAvatarURL({
                            dynamic: true
                        })))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## <:Star:1441118708981563522> Sentinel Management Panel Suggestion\n\nEste painel é o centro neural de administração do fluxo de feedback da comunidade. A partir daqui, você pode estabelecer as fundações de onde as vozes dos seus membros serão ouvidas.\n\n> - **Status Do Painel:** ${statusIcon}\n> - **Sugestões Ao Total:** ${totalSuggestions}\n> - **Canal De Sugestões Configurado:** ${channelStatus}\n\n**Gerenciamento de Infraestrutura**\nUtilize os controles abaixo para definir o canal de destino ou interromper o serviço.`)
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ChannelSelectMenuBuilder()
                            .setCustomId('sugestao_definir_canal_select')
                            .setPlaceholder('Configurar Canal (Selecione...)')
                            .addChannelTypes(ChannelType.GuildText)
                        )
                    )
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('sugestao_desativar_canal').setLabel('Desativar Canal').setStyle(ButtonStyle.Danger).setEmoji('🛑')
                        )
                    );

                await interacao.editReply({
                    components: [containerConfig],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });

            } else if (selected === 'Gerenciamento_Completo_De_Sugestão') {
                await interacao.deferReply({
                    flags: MessageFlags.Ephemeral
                });

                const suggestions = await Suggestion.find({
                    guildId: interacao.guild.id,
                    status: 'Pending'
                }).sort({
                    timestamp: -1
                }).limit(25);

                const totalPending = suggestions.length;

                if (totalPending === 0) {
                    return interacao.editReply({
                        components: [criarContainerResposta('Tudo Limpo!', 'Não há sugestões pendentes para revisar no momento.', 0x57F287)],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                }

                const options = await Promise.all(suggestions.map(async s => {
                    const user = await interacao.client.users.fetch(s.userId).catch(() => ({ username: 'Desconhecido' }));
                    const date = s.timestamp.toLocaleDateString('pt-BR');
                    return {
                        label: `Sugestão de ${user.username}`,
                        description: `Data: ${date} | ID: ${s._id}`,
                        value: s._id.toString(),
                        emoji: '📋'
                    };
                }));

                const selectMenu = new StringSelectMenuBuilder()
                    .setCustomId('sugestao_selecionar_para_moderar')
                    .setPlaceholder('Selecione uma sugestão para avaliar...')
                    .addOptions(options);

                const containerManager = new ContainerBuilder()
                    .setAccentColor(0x5865F2)
                    .addSectionComponents(
                        new SectionBuilder()
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(interacao.user.displayAvatarURL({
                            dynamic: true
                        })))
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## <:Star:1441118708981563522> Sentinel Management Panel Suggestion\n\nBem-vindo à interface de moderação de conteúdo. Aqui você tem o poder de moldar o futuro do servidor aceitando ou rejeitando as ideias da comunidade.\n\n> - **Moderador:** <@${interacao.user.id}>\n> - **Status Do Painel:** Ativo\n> - **Sugestões Pendentes:** ${totalPending}\n\nSelecione uma proposta na lista abaixo para visualizar os detalhes completos, tomar uma decisão administrativa ou verificar a integridade dos votos.`)
                        )
                    )
                    .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                    .addActionRowComponents(new ActionRowBuilder().addComponents(selectMenu));

                await interacao.editReply({
                    components: [containerManager],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }
            return;
        }

        if (interacao.customId === 'sugestao_selecionar_para_moderar') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });
            const suggestionId = interacao.values[0];
            const suggestion = await Suggestion.findById(suggestionId);

            if (!suggestion) {
                return interacao.editReply({
                    components: [criarContainerResposta('Erro', 'Sugestão não encontrada.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const user = await interacao.client.users.fetch(suggestion.userId).catch(() => ({
                tag: 'Desconhecido',
                id: suggestion.userId
            }));

            const containerDetails = new ContainerBuilder()
                .setAccentColor(0xFFA500)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## <:Icon_NewRelease:1427138810629591124> **System Sugestão**\n\n> - **Usuário:** <@${user.id}>\n> - **Sugestão Status:** ${suggestion.status}\n\n**Conteúdo da Proposta**\n\`\`\`${suggestion.content}\`\`\`\n\nUtilize os controles abaixo para decidir o destino desta sugestão.`)
                    )
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId(`sugestao_aprovar_${suggestionId}`).setLabel('Aprovar').setStyle(ButtonStyle.Success).setEmoji('✅'),
                        new ButtonBuilder().setCustomId(`sugestao_rejeitar_${suggestionId}`).setLabel('Rejeitar').setStyle(ButtonStyle.Danger).setEmoji('✖️'),
                        new ButtonBuilder().setCustomId(`sugestao_votos_${suggestionId}`).setLabel('Quem Votou Nessa Sugestão').setStyle(ButtonStyle.Secondary).setEmoji('📊')
                    )
                );

            await interacao.editReply({
                components: [containerDetails],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId.startsWith('sugestao_ver_detalhe_voto_')) {
            const userId = interacao.values[0];
            const suggestionId = interacao.customId.split('_')[4];

            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const suggestion = await Suggestion.findById(suggestionId);
            const vote = suggestion.voters.find(v => v.userId === userId);
            const user = await interacao.client.users.fetch(userId).catch(() => null);

            if (!vote || !user) {
                return interacao.editReply({
                    components: [criarContainerResposta('Erro', 'Dados do voto não encontrados.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            const voteEmoji = vote.voteType === 'up' ? '<a:Grenn:1443742656462061568> A favor' : '<a:Red:1443742654650388501> Contra';

            const containerVoteDetail = new ContainerBuilder()
                .setAccentColor(0x5865F2)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(user.displayAvatarURL({
                        dynamic: true
                    })))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## <:Icon_Sparkle:1427139161831243817> Sugestão Usuário\n\n> - **Usuário:** ${user.tag}\n> - **Sugestão Que O Usuário Votou:** ${suggestionId}\n> - **Usuário Votou Oque:** ${voteEmoji}\n> - **Status Da Sugestão:** ${suggestion.status}\n\nEste registro de auditoria confirma a participação do usuário no processo democrático do servidor.`)
                    )
                );

            await interacao.editReply({
                components: [containerVoteDetail],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'aviso_selecionar_usuario') {
            const valorSelecionado = interacao.values[0];
            if (valorSelecionado === 'pesquisar') {
                const modal = new ModalBuilder()
                    .setCustomId('aviso_pesquisar_usuario_modal')
                    .setTitle(truncarString('Buscar por Usuário', 45))
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                            .setCustomId('input_id_usuario_aviso')
                            .setLabel(truncarString('ID do Usuário', 45))
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('Cole o ID do usuário aqui...')
                            .setRequired(true)
                            .setMinLength(17)
                            .setMaxLength(20)
                        )
                    );
                await interacao.showModal(modal);
            } else {
                await mostrarPainelAvisos(interacao, valorSelecionado);
            }
            return;
        }

        if (interacao.customId === 'menu_selecao_idioma_traducao') {
            const codigoIdioma = interacao.values[0].substring('traduzir_definir_idioma_'.length);
            return await processarSalvamentoIdioma(interacao, codigoIdioma);
        }

        if (interacao.customId === 'aviso_remover_selecao') {
            await processarRemocaoAvisoUnico(interacao);
            return;
        }

        const partesCustomId = interacao.customId.split('_');

        if (interacao.customId === 'selecao_principal_ports') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const tipoSelecionado = interacao.values[0];
            const jogo = 'ports';
            const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipoSelecionado];

            if (!config) {
                return responderComErro(interacao, new Error(`Config de port inválida: ${tipoSelecionado}`), 'Esta opção não está configurada corretamente.');
            }

            const descricao = CONFIGURACAO_PAINEL_ADMIN.ports.embedsAdmin[tipoSelecionado];

            const containerPainelAdmin = new ContainerBuilder()
                .setAccentColor(config.corPrimaria)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent(descricao))
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

            const botoesAdmin = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`adicionar_json_${tipoSelecionado}_${jogo}_botao`).setLabel('Add JSON').setStyle(ButtonStyle.Secondary).setEmoji('<:sv_plus2:1441118777516228809>'),
                new ButtonBuilder().setCustomId(`remover_${tipoSelecionado}_${jogo}_botao`).setLabel(`Remover`).setStyle(ButtonStyle.Secondary).setEmoji('️<:lixeira:1441118923889184904>'),
                new ButtonBuilder().setCustomId(`editar_${tipoSelecionado}_${jogo}_botao`).setLabel('Editar Item').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_edit:1441118743580377109>'),
                new ButtonBuilder().setCustomId(`postar_${tipoSelecionado}_${jogo}_botao`).setLabel('Postar Hub').setStyle(ButtonStyle.Secondary).setEmoji('<:megaphone:1441118767785709806>'),
            );
            const botoesAdmin2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('botao_definir_logs').setLabel('Configurar Logs').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_settings:1441118761628467230>'),
                new ButtonBuilder().setCustomId(`definir_mensagem_personalizada_${tipoSelecionado}_${jogo}_botao`).setLabel('Msg Custom').setStyle(ButtonStyle.Secondary).setEmoji('<:info:1441118876891873381>')
            );

            containerPainelAdmin.addActionRowComponents(botoesAdmin, botoesAdmin2);

            await interacao.editReply({
                components: [containerPainelAdmin],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'selecao_principal_ports_knight') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const tipoSelecionado = interacao.values[0];
            const jogo = 'knight_ports';
            const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipoSelecionado];

            if (!config) {
                return responderComErro(interacao, new Error(`Config de port knight inválida: ${tipoSelecionado}`), 'Esta opção não está configurada corretamente.');
            }

            const descricao = CONFIGURACAO_PAINEL_ADMIN[jogo].embedsAdmin[tipoSelecionado];

            const containerPainelAdmin = new ContainerBuilder()
                .setAccentColor(config.corPrimaria)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                    .addTextDisplayComponents(new TextDisplayBuilder().setContent(descricao))
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

            const botoesAdmin = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`adicionar_json_${tipoSelecionado}_${jogo}_botao`).setLabel('Add JSON').setStyle(ButtonStyle.Secondary).setEmoji('<:sv_plus2:1441118777516228809>'),
                new ButtonBuilder().setCustomId(`remover_${tipoSelecionado}_${jogo}_botao`).setLabel(`Remover`).setStyle(ButtonStyle.Secondary).setEmoji('️<:lixeira:1441118923889184904>'),
                new ButtonBuilder().setCustomId(`editar_${tipoSelecionado}_${jogo}_botao`).setLabel('Editar Item').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_edit:1441118743580377109>'),
                new ButtonBuilder().setCustomId(`postar_${tipoSelecionado}_${jogo}_botao`).setLabel('Postar Hub').setStyle(ButtonStyle.Secondary).setEmoji('<:megaphone:1441118767785709806>'),
            );
            const botoesAdmin2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('botao_definir_logs').setLabel('Configurar Logs').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_settings:1441118761628467230>')
            );

            containerPainelAdmin.addActionRowComponents(botoesAdmin, botoesAdmin2);

            await interacao.editReply({
                components: [containerPainelAdmin],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
            return;
        }

        if (interacao.customId === 'selecao_opcoes_principais') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const tipoSelecionado = interacao.values[0];
            const jogo = 'silksong';
            const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipoSelecionado];
            if (!config) {
                return responderComErro(interacao, new Error(`Config principal inválida: ${tipoSelecionado}`), 'Esta opção não está configurada corretamente.');
            }

            const placeholders = {
                '{user.mention}': `<@${interacao.user.id}>`
            };
            const containerPainelAdmin = criarContainerDeJson(CONFIGURACAO_PAINEL_ADMIN[jogo].jsonEmbed, placeholders);

            const botoesAdmin = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`adicionar_${tipoSelecionado}_${jogo}_botao`).setLabel(`Add ${config.nome}`).setStyle(ButtonStyle.Secondary).setEmoji('<:sv_plus2:1441118777516228809>'),
                new ButtonBuilder().setCustomId(`adicionar_json_${tipoSelecionado}_${jogo}_botao`).setLabel('Add JSON').setStyle(ButtonStyle.Secondary).setEmoji('<:icon_link:1441118748848296048>'),
                new ButtonBuilder().setCustomId(`remover_${tipoSelecionado}_${jogo}_botao`).setLabel(`Remover`).setStyle(ButtonStyle.Secondary).setEmoji('️<:lixeira:1441118923889184904>'),
                new ButtonBuilder().setCustomId(`postar_${tipoSelecionado}_${jogo}_botao`).setLabel('Postar Hub').setStyle(ButtonStyle.Secondary).setEmoji('<:megaphone:1441118767785709806>')
            );

            if (tipoSelecionado !== 'fusion') {
                botoesAdmin.addComponents(
                    new ButtonBuilder().setCustomId(`atualizar_${tipoSelecionado}_${jogo}_botao`).setLabel('Trocar Painel').setStyle(ButtonStyle.Secondary).setEmoji('<:experimento:1441118832897953924>')
                );
            }

            const botoesAdmin2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`editar_${tipoSelecionado}_${jogo}_botao`).setLabel('Editar Item').setStyle(ButtonStyle.Secondary).setEmoji('️<:icon_edit:1441118743580377109>'),
                new ButtonBuilder().setCustomId('botao_definir_logs').setLabel('Configurar Logs').setStyle(ButtonStyle.Secondary).setEmoji('️<:icon_settings:1441118761628467230>'),
            );

            containerPainelAdmin
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(botoesAdmin, botoesAdmin2);

            await interacao.editReply({
                components: [containerPainelAdmin],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });

        } else if (
            interacao.customId.startsWith('menu_selecao_skin') ||
            interacao.customId.startsWith('menu_selecao_save') ||
            interacao.customId.startsWith('menu_selecao_mod') ||
            interacao.customId.startsWith('menu_selecao_fusao') ||
            interacao.customId.startsWith('menu_selecao_port')
        ) {
            const jogo = interacao.customId.includes('_knight') ? 'knight' :
                interacao.customId.includes('_port_dann') || (interacao.customId.includes('_port_gle') && !interacao.customId.includes('silksong')) ? 'knight_ports' :
                interacao.customId.includes('_port') ? 'ports' :
                'silksong';
            await tratarMenuSelecaoItem(interacao, jogo);
        } else if (interacao.customId.startsWith('selecao_editar_')) {
            const [_, __, tipo, ...partesJogo] = partesCustomId;
            const jogo = partesJogo.join('_');
            const idItem = interacao.values[0];
            const config = CONFIGURACAO_PAINEL_ADMIN[jogo].configItem[tipo];
            const item = await config.modelo.findOne({ _id: idItem, guildId: interacao.guild.id });

            if (!item) {
                return responderComErro(interacao, new Error(`Item de edição não encontrado: ${idItem}`), 'Este item não foi encontrado.');
            }
            if (!item.jsonEmbed) {
                return responderComErro(interacao, new Error(`Tentativa de editar item não-JSON: ${idItem}`), 'Este item não pode ser editado via JSON.');
            }

            const tituloModal = truncarString(`Editar ${config.nome}: ${item.title}`, 45);

            const modal = new ModalBuilder()
                .setCustomId(`editar_${tipo}_${jogo}_${idItem}_modal`)
                .setTitle(tituloModal);

            modal.addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('item_titulo_editar')
                    .setLabel(truncarString(`Título do ${config.nome} (Máx: 100 chars)`, 45))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                    .setValue(item.title)
                    .setMaxLength(100)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('item_descricao_editar')
                    .setLabel(truncarString("Descrição (Opcional, Máx: 1000 chars)", 45))
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(false)
                    .setValue(item.description || '')
                    .setMaxLength(1000)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('item_json_editar')
                    .setLabel(truncarString("Container JSON", 45))
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true)
                    .setValue(item.jsonEmbed)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('item_posicao_editar')
                    .setLabel('Posição (Ordem na lista, ex: 1)')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                    .setValue(item.position ? item.position.toString() : '1')
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('item_emoji_editar')
                    .setLabel(truncarString("Emoji (Opcional)", 45))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
                    .setValue(item.emoji || '')
                )
            );
            await interacao.showModal(modal);

        } else {}
    } else if (componentType === ComponentType.RoleSelect) {
        if (interacao.customId === 'warn_config_definir_cargos_select') {
            await interacao.deferReply({ flags: MessageFlags.Ephemeral });
            const selectedRoles = interacao.values;

            try {
                let config = await WarnConfig.findOne({ guildId: interacao.guild.id });
                if (!config) {
                    config = new WarnConfig({ guildId: interacao.guild.id });
                }

                // Lógica de Segurança: Validar Limite de Banimento
                if (selectedRoles.length > config.maxWarns) {
                    const containerErroSeguranca = new ContainerBuilder()
                        .setAccentColor(0xED4245)
                        .addSectionComponents(
                            new SectionBuilder()
                                .setThumbnailAccessory(new ThumbnailBuilder().setURL(THUMBNAIL_URL))
                                .addTextDisplayComponents(
                                    new TextDisplayBuilder().setContent(`## <:icon_moderation:1441118756678930614> Ação Bloqueada | Inconsistência Detectada\n\nVocê está tentando definir **${selectedRoles.length} cargos** de punição, mas o limite de banimento do servidor está configurado para **${config.maxWarns} aviso(s)**.\n\n### 🛡️ Protocolo de Segurança\nO sistema impede que você configure mais cargos do que avisos disponíveis antes do banimento para evitar falhas lógicas.\n\n**Solução:**\n1. Volte ao menu principal e aumente o "Limite de Avisos".\n2. Ou selecione apenas **${config.maxWarns}** cargo(s) ou menos.`)
                                )
                        );
                    
                    return await interacao.editReply({
                        components: [containerErroSeguranca],
                        flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                    });
                }

                config.warnRoles = selectedRoles;
                config.active = true;
                await config.save();

                const roleMentions = selectedRoles.map((id, i) => `**${i + 1}º Aviso:** <@&${id}>`).join('\n');
                const containerSucesso = criarContainerResposta(
                    'Sentinel System | Cargos Atualizados',
                    `Os cargos de punição foram definidos com sucesso! A hierarquia foi salva e está ativa.\n\n${roleMentions}`,
                    0x57F287
                );

                await interacao.editReply({
                    components: [containerSucesso],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (erro) {
                await responderComErro(interacao, erro, "Falha ao salvar os cargos de aviso.");
            }
            return;
        }
    } else if (componentType === ComponentType.ChannelSelect) {
        if (interacao.customId === 'definir_canal_logs_selecao') {
            return await tratarDefinirCanalLogs(interacao);
        }

        if (interacao.customId === 'sugestao_definir_canal_select') {
            await interacao.deferReply({
                flags: MessageFlags.Ephemeral
            });

            const channelId = interacao.values[0];
            try {
                await SuggestionConfig.findOneAndUpdate({
                    guildId: interacao.guild.id
                }, {
                    channelId: channelId,
                    active: true
                }, {
                    upsert: true
                });

                const containerSuccess = criarContainerResposta(
                    'Sentinel System | Canal Configurado',
                    `O canal de sugestões foi definido para <#${channelId}> e o sistema foi ativado.`,
                    0x57F287
                );
                await interacao.editReply({
                    components: [containerSuccess],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (err) {
                await responderComErro(interacao, err, "Erro ao salvar o canal de sugestões.");
            }
            return;
        }

        const partesCustomId = interacao.customId.split('_');
        const [acao, tipo, ...partesJogo] = partesCustomId.slice(0, -2);
        const jogo = partesJogo.join('_');

        if (acao === 'postar') {
            await tratarSelecaoCanal(interacao, tipo, jogo);
        } else {}
    }
}

async function roteadorEnvioModal(interacao) {
    const partesCustomId = interacao.customId.split('_');

    if (interacao.customId === 'aviso_pesquisar_usuario_modal') {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
        const idUsuario = interacao.fields.getTextInputValue('input_id_usuario_aviso');
        if (!/^\d{17,20}$/.test(idUsuario)) {
            const containerErro = criarContainerResposta('Sentinel System | Erro', 'O ID fornecido não parece ser um ID de usuário do Discord válido.', 0xED4245);
            return interacao.editReply({
                components: [containerErro],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }
        await mostrarPainelAvisos(interacao, idUsuario);
        return;
    }

    if (interacao.customId.startsWith('definir_mensagem_personalizada_')) {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
        const tipo = partesCustomId[3];
        const inputJson = interacao.fields.getTextInputValue('json_mensagem_personalizada').trim();

        const MapaModelos = {
            freddy: MensagemWorkshop,
            chines: MensagemWeave,
            gleports: MensagemGle
        };
        const Modelo = MapaModelos[tipo];
        const config = CONFIGURACAO_ITEM_PORTS[tipo];

        if (!Modelo || !config) {
            return responderComErro(interacao, new Error(`Tipo de modal de mensagem personalizada inválido: ${tipo}`), 'Erro de configuração interna.');
        }

        if (!inputJson) {
            try {
                await Modelo.deleteOne({
                    guildId: interacao.guild.id
                });
                const containerRemovido = criarContainerResposta('Sentinel System | Sucesso', `A mensagem personalizada para **${config.nome}** foi removida.`, 0x57F287);
                return await interacao.editReply({
                    components: [containerRemovido],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            } catch (erroDB) {
                return responderComErro(interacao, erroDB, 'Falha ao remover a mensagem personalizada do banco de dados.');
            }
        }

        try {
            JSON.parse(inputJson);
        } catch (erro) {
            return responderComErro(interacao, erro, 'O JSON fornecido é inválido. Verifique a sintaxe.');
        }

        try {
            await Modelo.findOneAndUpdate({
                guildId: interacao.guild.id
            }, {
                jsonMessage: inputJson
            }, {
                upsert: true,
                new: true
            });

            const containerPreview = criarContainerDeJson(inputJson);
            const containerSucesso = criarContainerResposta('Sentinel System | Sucesso!', `A mensagem personalizada para **${config.nome}** foi definida.`, 0x57F287);

            await interacao.editReply({
                components: [containerSucesso, containerPreview],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        } catch (erroDB) {
            return responderComErro(interacao, erroDB, 'Ocorreu um erro ao salvar a mensagem personalizada no banco de dados.');
        }
        return;
    }

    if (interacao.customId.startsWith('aviso_adicionar_modal_')) {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
        const idUsuarioAlvo = partesCustomId[3];
        const motivo = interacao.fields.getTextInputValue('input_motivo_aviso');

        try {
            const configWarn = await WarnConfig.findOne({ guildId: interacao.guild.id });
            if (!configWarn || !configWarn.active) {
                return responderComErro(interacao, new Error("Sistema não configurado"), "O sistema de Warn não está configurado ou ativo neste servidor.");
            }

            const novoAviso = new Warn({
                guildId: interacao.guild.id,
                userId: idUsuarioAlvo,
                moderatorId: interacao.user.id,
                reason: motivo,
            });
            await novoAviso.save();

            const membro = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
            const novaContagemAvisos = await Warn.countDocuments({
                guildId: interacao.guild.id,
                userId: idUsuarioAlvo
            });

            if (novaContagemAvisos >= configWarn.maxWarns) {
                if (membro) {
                    try {
                        await membro.ban({ reason: `Banimento Automático (Limite de Avisos Atingido: ${novaContagemAvisos}/${configWarn.maxWarns}). Último motivo: ${motivo}` });
                        await Warn.deleteMany({ guildId: interacao.guild.id, userId: idUsuarioAlvo });
                        
                        const containerBan = criarContainerResposta('Sentinel System | Banimento Automático', `O usuário <@${idUsuarioAlvo}> atingiu o limite de **${configWarn.maxWarns} avisos** e foi banido automaticamente. Todos os avisos foram resetados.`, 0xED4245);
                        return await interacao.editReply({
                            components: [containerBan],
                            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                        });
                    } catch (errBan) {
                        const containerErroBan = criarContainerResposta('Sentinel System | Falha no Banimento', `O usuário atingiu o limite de avisos, mas não foi possível bani-lo automaticamente (verifique minhas permissões). Os avisos foram mantidos.`, 0xFFA500);
                        return await interacao.editReply({
                            components: [containerErroBan],
                            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                        });
                    }
                }
            }

            await atualizarCargosAviso(membro, novaContagemAvisos);

            await interacao.editReply({
                components: [criarContainerResposta('Sentinel System | Sucesso', `Aviso adicionado com sucesso ao usuário <@${idUsuarioAlvo}>. Cargos atualizados. Total: **${novaContagemAvisos}/${configWarn.maxWarns}**.`, 0x57F287)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        } catch (erro) {
            await responderComErro(interacao, erro, 'Falha ao salvar o aviso no banco de dados.');
        }
        return;
    }

    if (interacao.customId.startsWith('aviso_mutar_modal_')) {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });
        const idUsuarioAlvo = partesCustomId[3];
        const duracaoStr = interacao.fields.getTextInputValue('input_duracao_mute_aviso');
        const motivo = interacao.fields.getTextInputValue('input_motivo_mute_aviso') || `Mutado por ${interacao.user.tag}`;

        if (!interacao.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interacao.editReply({
                components: [criarContainerResposta('Sentinel System | Erro', 'Você não tem a permissão de `Moderar Membros`.', 0xED4245)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }
        if (!interacao.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interacao.editReply({
                components: [criarContainerResposta('Sentinel System | Erro', 'Eu não tenho a permissão de `Moderar Membros`.', 0xED4245)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        const membroAlvo = await interacao.guild.members.fetch(idUsuarioAlvo).catch(() => null);
        if (!membroAlvo) {
            return interacao.editReply({
                components: [criarContainerResposta('Sentinel System | Erro', 'O usuário não foi encontrado.', 0xED4245)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        }

        try {
            const duracaoMs = ms(duracaoStr);
            if (!duracaoMs || duracaoMs <= 0) {
                return interacao.editReply({
                    components: [criarContainerResposta('Sentinel System | Erro', 'Forneça uma duração válida (ex: `10m`, `1h`, `7d`).', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }
            if (duracaoMs > 2419200000) {
                return interacao.editReply({
                    components: [criarContainerResposta('Sentinel System | Erro', 'A duração do mute não pode exceder 28 dias.', 0xED4245)],
                    flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
                });
            }

            await membroAlvo.timeout(duracaoMs, motivo);
            await interacao.editReply({
                components: [criarContainerResposta('Sentinel System | Sucesso', `<@${membroAlvo.id}> foi mutado por **${duracaoStr}**.`, 0x57F287)],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });
        } catch (erro) {
            await responderComErro(interacao, erro, 'Não foi possível mutar o membro. Eles podem ter um cargo maior que o meu.');
        }
        return;
    }

    if (interacao.customId === 'sugestao_enviar_modal') {
        await interacao.deferReply({
            flags: MessageFlags.Ephemeral
        });

        const conteudo = interacao.fields.getTextInputValue('input_conteudo_sugestao');

        const config = await SuggestionConfig.findOne({
            guildId: interacao.guild.id
        });
        
        if (!config || !config.active || !config.channelId) {
            return responderComErro(interacao, new Error('Sistema de sugestão inativo ou não configurado.'), "O sistema de sugestões foi desativado enquanto você escrevia. Por favor, contate um administrador.");
        }

        const canalDestino = await interacao.guild.channels.fetch(config.channelId).catch(() => null);
        if (!canalDestino) {
            return responderComErro(interacao, new Error('Canal de sugestão não encontrado.'), "O canal de sugestões configurado não foi encontrado ou foi excluído.");
        }

        try {
            const novaSugestao = new Suggestion({
                guildId: interacao.guild.id,
                userId: interacao.user.id,
                content: conteudo,
                status: 'Pending',
                channelId: config.channelId,
                voters: []
            });

            const sugestaoSalva = await novaSugestao.save();

            const containerSugestaoPublica = new ContainerBuilder()
                .setAccentColor(0xF1C40F)
                .addSectionComponents(
                    new SectionBuilder()
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(interacao.user.displayAvatarURL({
                        dynamic: true,
                        size: 256
                    })))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder()
                        .setContent(`## <:Icon_NewRelease:1427138810629591124> **System Sugestão**\n\n- **Usuário:** <@${interacao.user.id}>\n- **Sugestão:**\n${conteudo}\n- **Sugestão Status :** Pendente ⏳`)
                    )
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`ID da Sugestão: ${sugestaoSalva._id}`)
                )
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setCustomId(`sugestao_votar_up_${sugestaoSalva._id}`)
                        .setLabel('Concordo')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('1441118777516228809'),
                        new ButtonBuilder()
                        .setCustomId(`sugestao_votar_down_${sugestaoSalva._id}`)
                        .setLabel('Discordo')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('1441118923889184904')
                    )
                );

            const mensagemEnviada = await canalDestino.send({
                components: [containerSugestaoPublica],
                flags: MessageFlags.IsComponentsV2
            });

            sugestaoSalva.messageId = mensagemEnviada.id;
            await sugestaoSalva.save();
            
            const containerSucessoUsuario = criarContainerResposta(
                'Sugestão Enviada!',
                `Sua ideia foi postada com sucesso em <#${canalDestino.id}>.\nAgora é só aguardar a votação da comunidade e a revisão da staff.`,
                0x57F287
            );

            await interacao.editReply({
                components: [containerSucessoUsuario],
                flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral
            });

        } catch (erro) {
            await responderComErro(interacao, erro, "Falha ao processar e salvar sua sugestão.");
        }
        return;
    }

    let acao = partesCustomId[0];
    let tipo, jogo, idItem;

    if (acao === 'editar') {
        tipo = partesCustomId[1];
        jogo = partesCustomId.slice(2, -2).join('_');
        idItem = partesCustomId[partesCustomId.length - 2];
        await processarEdicaoItem(interacao, tipo, jogo, idItem);
        return;
    }

    if (partesCustomId[1] === 'json') {
        acao = 'adicionar_json';
        tipo = partesCustomId[2];
        jogo = partesCustomId.slice(3, -1).join('_');
    } else {
        tipo = partesCustomId[1];
        jogo = partesCustomId.slice(2, -1).join('_');
    }

    const handlersAcaoModal = {
        adicionar: (i, t, g) => processarAdicaoItem(i, t, g, false),
        adicionar_json: (i, t, g) => processarAdicaoItem(i, t, g, true),
    };

    if (handlersAcaoModal[acao] && CONFIGURACAO_PAINEL_ADMIN[jogo]) {
        await handlersAcaoModal[acao](interacao, tipo, jogo);
    } else {
        await responderComErro(interacao, new Error(`Handler de modal não encontrado para o customId: ${interacao.customId}`), 'Esta ação de modal não está configurada.');
    }
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interacao, cliente) {
        if (!interacao.guild) return;

        try {
            switch (interacao.type) {
                case InteractionType.ApplicationCommand:
                    await tratarComandoDeChat(interacao, cliente);
                    break;
                case InteractionType.MessageComponent:
                    await tratarComponenteDeMensagem(interacao);
                    break;
                case InteractionType.ModalSubmit:
                    await roteadorEnvioModal(interacao);
                    break;
                default:
                    break;
            }
        } catch (erro) {
            if (!interacao.replied && !interacao.deferred) {
                await responderComErro(interacao, erro, 'Ocorreu um erro crítico ao processar sua interação.');
            } else {
                console.error(`[<a:Error:1441118696692256871>] Erro crítico PÓS-RESPOSTA em interactionCreate (Usuário: ${interacao.user.tag}):`, erro);
            }
        }
    }
};


