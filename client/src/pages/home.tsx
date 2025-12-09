import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Gamepad2, 
  MessageSquare, 
  Coins, 
  Download, 
  Settings, 
  Users, 
  Zap,
  Terminal,
  Bot,
  Star,
  ArrowRight,
  ExternalLink,
  Heart,
  Sparkles,
  Crown,
  Palette,
  Save,
  Wrench,
  Smartphone,
  Monitor,
  Globe,
  CheckCircle2,
  Server,
  Command
} from "lucide-react";
import { SiDiscord } from "react-icons/si";

const SENTINEL_IMAGE = "https://iili.io/f2ePUAJ.png";
const DISCORD_INVITE = "https://discord.com/oauth2/authorize?client_id=1441098694559531179&permissions=2113928959&scope=bot+applications.commands";
";
const SUPPORT_SERVER = "https://discord.gg/7jnhjXGz7C";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsBar />
      <LoreSection />
      <SystemsSection />
      <PortsSection />
      <CommandsPreview />
      <AddBotSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
            <img 
              src={SENTINEL_IMAGE} 
              alt="The Sentinel" 
              className="w-10 h-10 rounded-full border-2 border-primary/50 group-hover:border-primary transition-colors"
            />
            <span className="font-display font-bold text-xl text-gradient hidden sm:block">
              The Sentinel
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <a href="#sistemas" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md" data-testid="link-sistemas">
              Sistemas
            </a>
            <a href="#ports" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md" data-testid="link-ports">
              Ports
            </a>
            <Link href="/comandos" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md" data-testid="link-comandos">
              Comandos
            </Link>
            <a href="#adicionar" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md" data-testid="link-adicionar">
              Adicionar Bot
            </a>
            <a href="#contato" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md" data-testid="link-contato">
              Contato
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block" data-testid="link-termos">
              Termos
            </Link>
            <Button size="sm" asChild data-testid="button-add-nav">
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <SiDiscord className="w-4 h-4 mr-2" />
                Adicionar
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Bot Público Discord
            </Badge>
            
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
              <span className="text-gradient">The Sentinel</span>
              <br />
              <span className="text-foreground">Guardião do Seu</span>
              <br />
              <span className="text-foreground">Servidor</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Moderação completa, sistema de economia, hub de Ports para 
              <span className="text-primary font-semibold"> Hollow Knight </span> 
              e 
              <span className="text-primary font-semibold"> Silksong</span>. 
              Tudo configurável ao seu gosto.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="glow-yellow animate-pulse-glow w-full sm:w-auto" asChild data-testid="button-add-hero">
                <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                  <SiDiscord className="w-5 h-5 mr-2" />
                  Adicionar ao Discord
                </a>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto" data-testid="button-commands-hero">
                <Link href="/comandos">
                  <Terminal className="w-5 h-5 mr-2" />
                  Ver Comandos
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
              <img 
                src={SENTINEL_IMAGE} 
                alt="The Sentinel Bot" 
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain animate-float drop-shadow-2xl"
                data-testid="img-sentinel-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: Server, label: "Servidores", value: "100+" },
    { icon: Users, label: "Usuários", value: "10.000+" },
    { icon: Command, label: "Comandos", value: "40+" },
    { icon: Zap, label: "Uptime", value: "99.9%" },
  ];

  return (
    <section className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-primary-foreground">
              <stat.icon className="w-6 h-6" />
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl" data-testid={`stat-value-${i}`}>{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoreSection() {
  return (
    <section className="py-20 lg:py-28 bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-4">
              <Crown className="w-3 h-3 mr-1" />
              A História
            </Badge>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-gradient">
              A Lore do Sentinel
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                <span className="text-primary font-semibold">The Sentinel</span> foi criado baseado em um robô guardião que protegia a Sentinela no 
                <span className="text-foreground font-medium"> Reino de Pharlhom</span>, universo de 
                <span className="text-primary"> Hollow Knight Silksong</span>.
              </p>
              
              <p>
                Assim como seu homônimo protegia o reino contra inimigos, este bot foi desenvolvido para ser o 
                <span className="text-foreground font-medium"> guardião definitivo</span> do seu servidor Discord. 
                Com sistemas de moderação avançados, economia interativa e um hub completo de recursos para a comunidade de Hollow Knight.
              </p>
              
              <p>
                O projeto nasceu com a missão de oferecer uma solução 
                <span className="text-foreground font-medium"> completa, configurável e gratuita</span> para 
                servidores que buscam qualidade e praticidade em um único bot.
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 card-glow transition-all duration-300 max-w-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">Propósito</h3>
                  <p className="text-sm text-muted-foreground">Por que o Sentinel existe</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Moderação Completa</span> - Sistema de warns, bans, mutes e logs automatizados
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Hub de Ports</span> - Central de downloads para Hollow Knight Mobile
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">100% Configurável</span> - Painéis interativos para personalizar tudo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Gratuito</span> - Todas as funcionalidades sem custo algum
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  const systems = [
    {
      icon: Shield,
      title: "Sistema de Moderação",
      description: "Proteção completa com comandos de ban, kick, mute e timeout. Hierarquia de permissões, logs detalhados e ações automatizadas para manter seu servidor seguro.",
      features: ["Ban/Kick/Mute", "Sistema de Warns", "Logs de Auditoria", "Timeout Temporário"],
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: MessageSquare,
      title: "Sistema de Advertências",
      description: "Painel de warns totalmente configurável. Defina punições progressivas automáticas, limites personalizados e gerencie infrações de forma visual e intuitiva.",
      features: ["Punições Automáticas", "Limites Configuráveis", "Expiração de Warns", "Painel Visual"],
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Coins,
      title: "Sistema de Economia",
      description: "Engaje sua comunidade com um sistema monetário completo. Recompensas diárias com raridades, apostas em grupo, ranking e transferências entre membros.",
      features: ["Recompensas Diárias", "Apostas em Grupo", "Sistema de Saldo", "Ranking de Membros"],
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Settings,
      title: "Sistema de Sugestões",
      description: "Canal dedicado para feedback da comunidade. Configure canais, aprove ou recuse sugestões e mantenha um fluxo organizado de ideias no seu servidor.",
      features: ["Canal Configurável", "Aprovar/Recusar", "Votação Integrada", "Gerenciamento Visual"],
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Palette,
      title: "Gerenciamento de Skins",
      description: "Administre skins personalizadas para Hollow Knight e Silksong. Adicione, edite e organize através de painéis interativos com embeds customizados.",
      features: ["Adicionar/Remover", "Embeds Personalizados", "Menu de Seleção", "Logs de Alteração"],
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Save,
      title: "Gerenciamento de Saves",
      description: "Central de saves para a comunidade. Gerencie arquivos de progresso com descrições detalhadas e sistema de download organizado por categorias.",
      features: ["Upload de Saves", "Categorização", "Descrições Detalhadas", "Download Direto"],
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Wrench,
      title: "Gerenciamento de Mods",
      description: "Hub completo de mods e mods de fusão. Organize modificações com links, thumbnails e informações técnicas para facilitar o acesso da comunidade.",
      features: ["Mods Regulares", "Mods de Fusão", "Links e Thumbnails", "Informações Técnicas"],
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Globe,
      title: "Sistema de Tradução",
      description: "Traduza mensagens instantaneamente para qualquer idioma. Botões interativos permitem que membros traduzam conteúdo com apenas um clique.",
      features: ["Tradução Instantânea", "Múltiplos Idiomas", "Botões Interativos", "Seleção de Idioma"],
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <section id="sistemas" className="py-20 lg:py-28 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Zap className="w-3 h-3 mr-1" />
            Funcionalidades
          </Badge>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            <span className="text-gradient">Sistemas</span> Completos
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada sistema foi desenvolvido para ser totalmente configurável e atender às necessidades específicas do seu servidor.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, i) => (
            <Card 
              key={i} 
              className="p-6 bg-card border-border/50 hover:border-primary/30 card-glow transition-all duration-300 group"
              data-testid={`card-system-${i}`}
            >
              <div className={`w-12 h-12 rounded-lg ${system.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <system.icon className={`w-6 h-6 ${system.color}`} />
              </div>
              
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{system.title}</h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {system.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {system.features.map((feature, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortsSection() {
  const portCategories = [
    {
      game: "Hollow Knight Silksong",
      icon: Gamepad2,
      description: "Ports do aguardado Hollow Knight Silksong para dispositivos Android",
      platforms: [
        {
          name: "Porting Workshop",
          desc: "Versão mais estável com gráficos aprimorados",
          features: ["Gráficos HD", "Suporte a Teclado", "Estável"],
        },
        {
          name: "Weave Wing",
          desc: "Versão otimizada com HUD customizável",
          features: ["HUD Customizável", "Otimizado", "Touch Adaptado"],
        },
        {
          name: "Gle Ports",
          desc: "Versão alternativa com recursos especiais",
          features: ["Recursos Extras", "Atualizações Frequentes", "Suporte Ativo"],
        },
      ],
    },
    {
      game: "Hollow Knight",
      icon: Crown,
      description: "Ports do clássico Hollow Knight para Android e iOS",
      platforms: [
        {
          name: "Dann Cooper (Android)",
          desc: "A versão mais otimizada para Android atualmente",
          features: ["Altamente Otimizado", "Suporte Completo", "Poucos Bugs"],
        },
        {
          name: "GLE Ports (iOS)",
          desc: "Port dedicado para dispositivos Apple",
          features: ["iOS Nativo", "Gráficos HD", "Controles Touch"],
        },
      ],
    },
  ];

  return (
    <section id="ports" className="py-20 lg:py-28 bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Smartphone className="w-3 h-3 mr-1" />
            Mobile Gaming
          </Badge>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Hub de <span className="text-gradient">Ports</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Central de downloads para todas as versões portadas de Hollow Knight e Silksong para dispositivos móveis.
          </p>
        </div>
        
        <div className="space-y-12">
          {portCategories.map((category, i) => (
            <Card key={i} className="p-8 bg-card/80 border-primary/10" data-testid={`card-port-category-${i}`}>
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">{category.game}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.platforms.map((platform, j) => (
                  <div key={j} className="p-5 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                    <h4 className="font-semibold text-foreground mb-1">{platform.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{platform.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {platform.features.map((feature, k) => (
                        <Badge key={k} variant="outline" className="text-xs border-primary/30 text-primary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Os painéis de download são totalmente editáveis pelos administradores através do bot.
          </p>
          <Badge variant="secondary">
            <Settings className="w-3 h-3 mr-1" />
            Painel Menu Downloads - Configure textos, thumbnails, imagens e botões
          </Badge>
        </div>
      </div>
    </section>
  );
}

function CommandsPreview() {
  const categories = [
    {
      name: "Moderação",
      icon: Shield,
      color: "text-red-400",
      commands: ["/ban", "/kick", "/mute", "/warn", "/unwarn", "/nuke"],
    },
    {
      name: "Economia",
      icon: Coins,
      color: "text-yellow-400",
      commands: ["/daily", "/saldo", "/apostar", "/adicionar"],
    },
    {
      name: "Administração",
      icon: Settings,
      color: "text-blue-400",
      commands: ["/menu", "/silksong", "/dannegle", "/warnconfig"],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Terminal className="w-3 h-3 mr-1" />
            40+ Comandos
          </Badge>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            <span className="text-gradient">Comandos</span> Poderosos
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma coleção completa de comandos para moderação, diversão e administração do seu servidor.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, i) => (
            <Card key={i} className="p-6 bg-card border-border/50" data-testid={`card-command-preview-${i}`}>
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
                <h3 className="font-display font-bold text-lg">{cat.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.commands.map((cmd, j) => (
                  <code key={j} className="px-2 py-1 rounded bg-muted text-sm font-mono text-primary">
                    {cmd}
                  </code>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" asChild data-testid="button-view-all-commands">
            <Link href="/comandos">
              Ver Todos os Comandos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function AddBotSection() {
  const steps = [
    { step: "1", title: "Adicione o Bot", desc: "Clique no botão e autorize no seu servidor" },
    { step: "2", title: "Configure", desc: "Use /warnconfig e /setupsugestão para personalizar" },
    { step: "3", title: "Aproveite", desc: "Comece a usar todos os comandos e sistemas" },
  ];

  return (
    <section id="adicionar" className="py-20 lg:py-28 bg-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Adicione o <span className="text-gradient">Sentinel</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Em apenas 3 passos simples, seu servidor estará protegido e equipado com todos os recursos do Sentinel.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((item, i) => (
            <Card key={i} className="p-6 text-center bg-card/80 border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="glow-yellow-intense text-lg px-8 py-6 h-auto" asChild data-testid="button-add-main">
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <SiDiscord className="w-6 h-6 mr-3" />
              Adicionar ao Discord
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Permissões necessárias: Administrador (recomendado) ou permissões específicas
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="py-20 lg:py-28 bg-card/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Heart className="w-3 h-3 mr-1" />
            Suporte
          </Badge>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Contatar <span className="text-gradient">Desenvolvedor</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Precisa de ajuda, encontrou um bug ou tem uma sugestão? Entre em contato conosco!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <SiDiscord className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Servidor de Suporte</h3>
                <p className="text-sm text-muted-foreground">Comunidade oficial do Sentinel</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Entre no nosso servidor para suporte em tempo real, atualizações e interagir com a comunidade.
            </p>
            <Button variant="outline" asChild className="w-full" data-testid="button-support-server">
              <a href={SUPPORT_SERVER} target="_blank" rel="noopener noreferrer">
                Entrar no Servidor
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>
          
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Desenvolvedor</h3>
                <p className="text-sm text-muted-foreground">Criado por Hann</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              O Sentinel é desenvolvido com dedicação para oferecer a melhor experiência para sua comunidade.
            </p>
            <Button variant="secondary" className="w-full" disabled>
              <Heart className="w-4 h-4 mr-2" />
              Feito com Amor
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={SENTINEL_IMAGE} alt="The Sentinel" className="w-10 h-10 rounded-full" />
              <span className="font-display font-bold text-xl text-gradient">The Sentinel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Guardião do seu servidor Discord. Moderação completa, economia e hub de Ports para Hollow Knight.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#sistemas" className="text-muted-foreground hover:text-primary transition-colors">Sistemas</a></li>
              <li><a href="#ports" className="text-muted-foreground hover:text-primary transition-colors">Ports</a></li>
              <li><Link href="/comandos" className="text-muted-foreground hover:text-primary transition-colors">Comandos</Link></li>
              <li><a href="#adicionar" className="text-muted-foreground hover:text-primary transition-colors">Adicionar Bot</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/termos" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link href="/termos#privacidade" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos#regras" className="text-muted-foreground hover:text-primary transition-colors">Regras de Uso</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2025 The Sentinel. Desenvolvido com <Heart className="w-3 h-3 inline text-red-400" /> por Hann.
          </p>
          <p className="text-xs text-muted-foreground">
            Hollow Knight e Silksong são propriedade da Team Cherry.
          </p>
        </div>
      </div>
    </footer>
  );
}
