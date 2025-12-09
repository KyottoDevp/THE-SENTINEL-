import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Coins,
  Settings,
  ArrowLeft,
  Terminal,
  Ban,
  UserMinus,
  VolumeX,
  Volume2,
  AlertTriangle,
  ShieldOff,
  Bomb,
  MessageSquare,
  Trophy,
  Wallet,
  PlusCircle,
  Lightbulb,
  Cog,
  Key,
  KeyRound,
  Gamepad2,
  Smartphone,
  Languages,
  Wifi,
  Trash2,
  ListOrdered,
  Info,
  Gauge,
  Search,
} from "lucide-react";
import { SiDiscord } from "react-icons/si";

const SENTINEL_IMAGE = "https://iili.io/f2ePUAJ.png";

interface Command {
  name: string;
  shortDesc: string;
  fullDesc: string;
  usage?: string;
  permissions?: string;
  icon: typeof Shield;
}

const COMMANDS: Record<string, { info: { title: string; emoji: typeof Shield; desc: string; color: string }; commands: Command[] }> = {
  moderacao: {
    info: {
      title: "Segurança & Moderação",
      emoji: Shield,
      desc: "Ferramentas administrativas robustas para garantir a integridade do servidor e gerenciar o comportamento dos membros.",
      color: "text-red-400",
    },
    commands: [
      {
        name: "/ban",
        shortDesc: "Bane permanentemente um usuário do servidor.",
        fullDesc: "Remove permanentemente um membro do servidor. Inclui verificação hierárquica de cargos, notificação via DM ao usuário banido e registro completo nos logs de auditoria. Ideal para infrações graves.",
        usage: "/ban @usuário [motivo]",
        permissions: "Ban Members",
        icon: Ban,
      },
      {
        name: "/kick",
        shortDesc: "Expulsa um usuário, permitindo que ele retorne.",
        fullDesc: "Remove temporariamente um usuário do servidor. Diferente do banimento, o membro pode retornar com um novo convite. Útil para infrações moderadas ou como advertência.",
        usage: "/kick @usuário [motivo]",
        permissions: "Kick Members",
        icon: UserMinus,
      },
      {
        name: "/mute",
        shortDesc: "Silencia um usuário por um tempo determinado.",
        fullDesc: "Aplica timeout nativo do Discord ao usuário, restringindo sua capacidade de enviar mensagens, reagir e falar em canais de voz. Duração flexível de minutos até 28 dias.",
        usage: "/mute @usuário <duração> [motivo]",
        permissions: "Moderate Members",
        icon: VolumeX,
      },
      {
        name: "/unmute",
        shortDesc: "Remove o silenciamento de um usuário.",
        fullDesc: "Reverte imediatamente uma punição de timeout ativa, restaurando todas as permissões de comunicação do usuário. Essencial para corrigir erros ou reabilitar membros.",
        usage: "/unmute @usuário",
        permissions: "Moderate Members",
        icon: Volume2,
      },
      {
        name: "/warn",
        shortDesc: "Aplica uma advertência oficial a um usuário.",
        fullDesc: "Registra uma infração formal no perfil do usuário. O sistema monitora advertências ativas e pode aplicar punições progressivas automáticas conforme configuração (mute, kick, ban).",
        usage: "/warn @usuário <motivo>",
        permissions: "Moderate Members",
        icon: AlertTriangle,
      },
      {
        name: "/unwarn",
        shortDesc: "Remove advertências de um usuário.",
        fullDesc: "Permite visualizar e remover advertências específicas pelo ID único, ou realizar limpeza completa do histórico. Fundamental para reabilitação de membros.",
        usage: "/unwarn @usuário [id_warn | all]",
        permissions: "Moderate Members",
        icon: ShieldOff,
      },
      {
        name: "/warnconfig",
        shortDesc: "Configura o sistema de advertências e punições.",
        fullDesc: "Painel de controle administrativo para o sistema de warns. Configure cargos por nível, limites de punição, ações automáticas (mute/kick/ban) e tempo de expiração.",
        usage: "/warnconfig",
        permissions: "Gerenciar Canais",
        icon: Cog,
      },
      {
        name: "/warnpanel",
        shortDesc: "Painel de gerenciamento de advertências.",
        fullDesc: "Interface visual interativa para moderadores. Visualize o status do usuário, contagem de warns e execute ações rápidas como adicionar/remover advertências ou aplicar punições.",
        usage: "/warnpanel @usuário",
        permissions: "Moderate Members",
        icon: ListOrdered,
      },
      {
        name: "/nuke",
        shortDesc: "Recria um canal, limpando todo o histórico.",
        fullDesc: "Ferramenta para situações extremas como raids ou spam massivo. Clona configurações do canal (nome, tópico, permissões), deleta o original e cria versão limpa.",
        usage: "/nuke",
        permissions: "Manage Channels",
        icon: Bomb,
      },
      {
        name: "/say",
        shortDesc: "Permite que o bot envie uma mensagem customizada.",
        fullDesc: "Envia mensagens através da identidade do bot. Suporta embeds via JSON para anúncios formatados. Ideal para comunicados oficiais e regras do servidor.",
        usage: "/say <mensagem>",
        permissions: "Manage Messages",
        icon: MessageSquare,
      },
      {
        name: "/topmutes",
        shortDesc: "Exibe ranking de usuários mais mutados.",
        fullDesc: "Gera relatório estatístico classificando membros com maior número de timeouts. Cruza informações dos logs de auditoria para análise de comportamento.",
        usage: "/topmutes",
        permissions: "Moderate Members",
        icon: Trophy,
      },
      {
        name: "/unban",
        shortDesc: "Revoga o banimento de um usuário pelo ID.",
        fullDesc: "Permite que um administrador anule um banimento previamente aplicado usando o ID do Discord do usuário, autorizando seu retorno ao servidor.",
        usage: "/unban <id_usuário>",
        permissions: "Ban Members",
        icon: ShieldOff,
      },
      {
        name: "/permission",
        shortDesc: "Sistema Para Testes Privados Em Novos Sistemas",
        usage: "/permission <add|remove> @usuário",
        permissions: "Bot Owner",
        icon: Key,
      },
      {
        name: "/permissionrole",
        shortDesc: "Isso E Para Testes Privados Que Ajuda No Desenvolvimento ",
        usage: "/permissionrole <add|remove> @cargo",
        permissions: "Onwer",
        icon: KeyRound,
      },
    ],
  },
  diversao: {
    info: {
      title: "Diversão & Economia",
      emoji: Coins,
      desc: "Módulos interativos que enriquecem a experiência da comunidade com sistema de economia, apostas e engajamento social.",
      color: "text-yellow-400",
    },
    commands: [
      {
        name: "/daily",
        shortDesc: "Coleta a recompensa monetária diária.",
        fullDesc: "Resgata sua recompensa diária com sistema de raridades (Comum, Incomum, Raro, Épico, Lendário). Mantém sequência de dias consecutivos para bônus crescentes.",
        usage: "/daily",
        permissions: "Todos",
        icon: Coins,
      },
      {
        name: "/saldo",
        shortDesc: "Exibe o saldo e sequência diária.",
        fullDesc: "Mostra o saldo atual de Rosários (moeda do servidor) e a sequência de dias consecutivos coletando recompensas. Pode consultar o saldo de outros membros.",
        usage: "/saldo [@usuário]",
        permissions: "Todos",
        icon: Wallet,
      },
      {
        name: "/apostar",
        shortDesc: "Cria uma aposta em grupo.",
        fullDesc: "Inicia evento de aposta interativo onde membros pagam uma entrada definida. Quando a sala atinge a capacidade máxima, um vencedor é sorteado e leva o prêmio total.",
        usage: "/apostar <valor> <max_jogadores>",
        permissions: "Todos",
        icon: Coins,
      },
      {
        name: "/adicionar",
        shortDesc: "Adiciona moedas ao saldo de um usuário.",
        fullDesc: "Comando exclusivo para donos do bot. Permite transferir moedas diretamente para o saldo de qualquer membro do servidor.",
        usage: "/adicionar @usuário <quantia>",
        permissions: "Bot Owner",
        icon: PlusCircle,
      },
      {
        name: "/sugerir",
        shortDesc: "Abre formulário para enviar uma sugestão.",
        fullDesc: "Abre modal de sugestão com campo para texto detalhado (até 3000 caracteres). A sugestão é enviada ao canal configurado para votação da comunidade.",
        usage: "/sugerir",
        permissions: "Todos",
        icon: Lightbulb,
      },
      {
        name: "/setupsugestão",
        shortDesc: "Configura o sistema de sugestões.",
        fullDesc: "Painel administrativo para configurar o canal de sugestões, ativar/desativar o sistema e gerenciar sugestões pendentes (aprovar, recusar, apagar).",
        usage: "/setupsugestão",
        permissions: "Administrator",
        icon: Cog,
      },
    ],
  },
  administracao: {
    info: {
      title: "Administração & Painéis",
      emoji: Settings,
      desc: "Comandos administrativos para gerenciamento completo de conteúdo, ports e recursos do bot.",
      color: "text-blue-400",
    },
    commands: [
      {
        name: "/menu",
        shortDesc: "Painel de gerenciamento de conteúdo Silksong.",
        fullDesc: "Interface administrativa completa para gerenciar assets do Hollow Knight Silksong. Adicione, edite e remova Skins, Saves, Mods e Mods de Fusão com embeds personalizados.",
        usage: "/menu",
        permissions: "Permissões De Gerenciamento De Mensagens",
        icon: Gamepad2,
      },
      {
        name: "/silksong",
        shortDesc: "Painel administrativo de Ports (Silksong).",
        fullDesc: "Painel técnico para administração das versões portadas de Silksong. Gerencie ports do Porting Workshop, Weave Wing e Gle Ports com controle total sobre downloads.",
        usage: "/silksong",
        permissions: "Permissões De Gerenciamento De Mensagens",
        icon: Smartphone,
      },
      {
        name: "/dannegle",
        shortDesc: "Painel de gerenciamento de Hollow Knight Mobile.",
        fullDesc: "Ferramenta administrativa para controle das versões de Hollow Knight portadas para Android (Dann Cooper) e iOS (GLE). Mantenha os hubs de download atualizados.",
        usage: "/dannegle",
        permissions: "Permissões De Gerenciamento De Mensagens",
        icon: Smartphone,
      },
      {
        name: "/systemtranslation",
        shortDesc: "Anexa painel de tradução a uma mensagem.",
        fullDesc: "Adiciona botões interativos de tradução a qualquer mensagem do servidor. Membros podem traduzir o conteúdo para seu idioma com apenas um clique.",
        usage: "/systemtranslation <id_mensagem>",
        permissions: "Manage Messages",
        icon: Languages,
      },
      {
        name: "/conectar",
        shortDesc: "Conecta o bot a um canal de voz.",
        fullDesc: "Faz o bot entrar em um canal de voz específico do servidor. Útil para funcionalidades futuras ou manter presença em canais de voz.",
        usage: "/conectar #canal",
        permissions: "Connect",
        icon: Wifi,
      },
      {
        name: "/excluir",
        shortDesc: "Exclui um item do banco de dados.",
        fullDesc: "Remove permanentemente um registro do banco de dados pelo título ou ID. Usado para limpar emojis ou itens obsoletos do sistema.",
        usage: "/excluir <identificador>",
        permissions: "permissão De Gerenciar mensagens",
        icon: Trash2,
      },
      {
        name: "/emojis",
        shortDesc: "Lista emojis customizados salvos.",
        fullDesc: "Exibe todos os emojis personalizados armazenados no banco de dados e verifica sua validade atual no Discord. Identifica emojis quebrados ou removidos.",
        usage: "/emojis",
        permissions: "permissao De Gerenciar mensagens",
        icon: ListOrdered,
      },
      {
        name: "/info",
        shortDesc: "Exibe informações e estatísticas do bot.",
        fullDesc: "Mostra estatísticas completas do Sentinel: quantidade de servidores, comandos disponíveis, links úteis e informações sobre o desenvolvedor.",
        usage: "/info",
        permissions: "Todos",
        icon: Info,
      },
      {
        name: "/ping",
        shortDesc: "Verifica latência e conexão com a API.",
        fullDesc: "Exibe latência do WebSocket, tempo de resposta da API do Discord e uptime do bot. Útil para diagnosticar problemas de conexão.",
        usage: "/ping",
        permissions: "Todos",
        icon: Gauge,
      },
    ],
  },
};

export default function Commands() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("moderacao");

  const filterCommands = (commands: Command[]) => {
    if (!searchQuery) return commands;
    const query = searchQuery.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(query) ||
        cmd.shortDesc.toLowerCase().includes(query)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-3 group" data-testid="link-back-home">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <img
                src={SENTINEL_IMAGE}
                alt="The Sentinel"
                className="w-10 h-10 rounded-full border-2 border-primary/50"
              />
              <span className="font-display font-bold text-xl text-gradient hidden sm:block">
                The Sentinel
              </span>
            </Link>

            <Button size="sm" asChild data-testid="button-add-commands">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <SiDiscord className="w-4 h-4 mr-2" />
                Adicionar
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Terminal className="w-3 h-3 mr-1" />
              Documentação Completa
            </Badge>

            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
              <span className="text-gradient">Comandos</span> do Sentinel
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Explore todos os comandos disponíveis organizados por categoria.
              Clique em cada comando para ver detalhes completos.
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar comandos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                data-testid="input-search-commands"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8 h-auto p-1">
              {Object.entries(COMMANDS).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-${key}`}
                >
                  <category.info.emoji className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.info.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(COMMANDS).map(([key, category]) => {
              const filteredCommands = filterCommands(category.commands);

              return (
                <TabsContent key={key} value={key}>
                  <Card className="p-6 mb-8 bg-card/50 border-border/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-card flex items-center justify-center ${category.info.color}`}>
                        <category.info.emoji className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-xl">{category.info.title}</h2>
                        <p className="text-muted-foreground text-sm">{category.info.desc}</p>
                      </div>
                    </div>
                  </Card>

                  {filteredCommands.length === 0 ? (
                    <Card className="p-8 text-center bg-card/50 border-border/50">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Nenhum comando encontrado para "{searchQuery}"
                      </p>
                    </Card>
                  ) : (
                    <Accordion type="multiple" className="space-y-3">
                      {filteredCommands.map((cmd, i) => (
                        <AccordionItem
                          key={i}
                          value={cmd.name}
                          className="bg-card border border-border/50 rounded-lg px-4 data-[state=open]:border-primary/30"
                          data-testid={`accordion-${cmd.name.replace("/", "")}`}
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-4 text-left">
                              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${category.info.color}`}>
                                <cmd.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <code className="font-mono text-primary font-semibold">{cmd.name}</code>
                                <p className="text-sm text-muted-foreground mt-0.5">{cmd.shortDesc}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="pl-14 space-y-4">
                              <p className="text-muted-foreground">{cmd.fullDesc}</p>

                              <div className="grid sm:grid-cols-2 gap-4">
                                {cmd.usage && (
                                  <div className="p-3 rounded-lg bg-muted/50">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Uso</span>
                                    <code className="block mt-1 text-sm font-mono text-foreground">{cmd.usage}</code>
                                  </div>
                                )}
                                {cmd.permissions && (
                                  <div className="p-3 rounded-lg bg-muted/50">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Permissão</span>
                                    <p className="mt-1 text-sm text-foreground">{cmd.permissions}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>

      <footer className="py-8 bg-card border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            2025 The Sentinel. Desenvolvido por Hann.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
