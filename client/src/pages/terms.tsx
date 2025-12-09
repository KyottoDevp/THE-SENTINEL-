import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Shield,
  Eye,
  Scale,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Lock,
  RefreshCw,
  Mail,
} from "lucide-react";
import { SiDiscord } from "react-icons/si";

const SENTINEL_IMAGE = "https://iili.io/f2ePUAJ.png";
const LAST_UPDATE = "08 de Dezembro de 2025";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-3 group" data-testid="link-back-home-terms">
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

            <Button size="sm" asChild data-testid="button-add-terms">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <SiDiscord className="w-4 h-4 mr-2" />
                Adicionar
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <FileText className="w-3 h-3 mr-1" />
              Documentação Legal
            </Badge>

            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
              Termos de <span className="text-gradient">Uso</span>
            </h1>

            <p className="text-muted-foreground">
              Última atualização: {LAST_UPDATE}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">1. Aceitação dos Termos</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Ao adicionar o <span className="text-foreground font-medium">The Sentinel</span> ao seu servidor Discord ou utilizar qualquer uma de suas funcionalidades, você concorda integralmente com estes Termos de Uso.
                </p>
                <p>
                  Se você não concordar com qualquer parte destes termos, não deve utilizar o bot. O uso continuado após alterações nos termos constitui aceitação das mudanças.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">2. Descrição do Serviço</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  O The Sentinel é um bot Discord público e gratuito que oferece:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sistema completo de moderação (warn, ban, kick, mute)</li>
                  <li>Sistema de economia e recompensas diárias</li>
                  <li>Hub de downloads para Ports de Hollow Knight e Silksong</li>
                  <li>Gerenciamento de conteúdo (skins, saves, mods)</li>
                  <li>Sistema de sugestões para feedback da comunidade</li>
                  <li>Painéis interativos configuráveis</li>
                </ul>
              </div>
            </Card>

            <Card id="regras" className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">3. Regras de Uso</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-4">
                <div>
                  <h3 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Uso Permitido
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Utilizar o bot para moderação legítima do servidor</li>
                    <li>Configurar painéis e sistemas conforme suas necessidades</li>
                    <li>Compartilhar conteúdo legal e apropriado através dos hubs</li>
                    <li>Reportar bugs e sugerir melhorias através dos canais oficiais</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Uso Proibido
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Utilizar o bot para atividades ilegais ou que violem os Termos de Serviço do Discord</li>
                    <li>Tentar explorar vulnerabilidades ou realizar ataques ao bot</li>
                    <li>Automatizar interações de forma abusiva (spam de comandos)</li>
                    <li>Distribuir conteúdo malicioso através dos sistemas de upload</li>
                    <li>Usar o sistema de economia para fraudes ou manipulação</li>
                    <li>Compartilhar conteúdo com direitos autorais sem permissão</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card id="privacidade" className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">4. Política de Privacidade</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-4">
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Dados Coletados</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><span className="text-foreground">IDs do Discord:</span> IDs de usuários, servidores e canais para funcionamento dos sistemas</li>
                    <li><span className="text-foreground">Dados de Moderação:</span> Registros de warns, bans e outras ações para histórico</li>
                    <li><span className="text-foreground">Dados de Economia:</span> Saldos e transações dentro do sistema de economia</li>
                    <li><span className="text-foreground">Configurações:</span> Preferências e configurações definidas pelos administradores</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Uso dos Dados</h3>
                  <p>
                    Os dados são utilizados exclusivamente para o funcionamento do bot e não são compartilhados com terceiros. Não coletamos mensagens, arquivos ou conteúdo pessoal além do necessário para as funcionalidades.
                  </p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Retenção e Exclusão</h3>
                  <p>
                    Dados de moderação são mantidos enquanto o bot estiver no servidor. Ao remover o bot, você pode solicitar a exclusão completa dos dados através do servidor de suporte.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">5. Propriedade Intelectual</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  O The Sentinel, incluindo seu código, design e marca, é propriedade do desenvolvedor (Hann). O uso do bot não transfere nenhum direito de propriedade intelectual.
                </p>
                <p>
                  <span className="text-foreground font-medium">Hollow Knight</span> e <span className="text-foreground font-medium">Hollow Knight: Silksong</span> são propriedade da <span className="text-foreground font-medium">Team Cherry</span>. Este bot não é afiliado, patrocinado ou endossado pela Team Cherry.
                </p>
                <p>
                  O conteúdo compartilhado através do hub de ports (mods, skins, saves) é de responsabilidade dos respectivos criadores.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">6. Isenção de Responsabilidade</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  O bot é fornecido "como está", sem garantias de qualquer tipo. Não nos responsabilizamos por:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Danos resultantes do uso ou incapacidade de uso do bot</li>
                  <li>Perda de dados devido a falhas técnicas</li>
                  <li>Ações de moderação executadas incorretamente por administradores</li>
                  <li>Interrupções de serviço ou manutenções</li>
                  <li>Conteúdo de terceiros compartilhado através do bot</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">7. Alterações nos Termos</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através do servidor de suporte ou atualizações no bot.
                </p>
                <p>
                  A data da última atualização está indicada no topo desta página. O uso continuado após alterações implica aceitação dos novos termos.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">8. Contato</h2>
                </div>
              </div>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Para dúvidas, sugestões ou solicitações relacionadas a estes termos ou ao bot em geral, entre em contato através de:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="text-foreground font-medium">Servidor de Suporte:</span> https://discord.gg/k36agHcU8</li>
                  <li><span className="text-foreground font-medium">Desenvolvedor:</span> Hann (Discord)</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Ao utilizar o The Sentinel, você confirma que leu e concorda com todos os termos acima.
            </p>
            <Button asChild data-testid="button-back-home">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-8 bg-card border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            2025 The Sentinel. Desenvolvido por Hann.
          </p>
        </div>
      </footer>
    </div>
  );
}
