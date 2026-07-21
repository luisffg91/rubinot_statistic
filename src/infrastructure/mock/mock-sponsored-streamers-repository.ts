import type {
  SponsoredStreamersRepository,
  SponsoredResult,
} from '@/domain/ports/sponsored-streamers-repository';
import type { SponsoredStreamer, SponsoredChannel } from '@/domain/entities/sponsored';

// Streamers/canais FICTÍCIOS de exemplo (não são pessoas reais) — origin='exemplo'.
const STREAMERS: Omit<SponsoredStreamer, 'platform' | 'url'>[] = [
  { channel: 'dragaolive', displayName: 'Dragão Live', isLive: true, liveTitle: 'Hunt em Auroria — bora!', viewers: 842 },
  { channel: 'retropvpbr', displayName: 'Retro PvP BR', isLive: true, liveTitle: 'War no mundo Bellum', viewers: 531 },
  { channel: 'questmaster', displayName: 'Quest Master', isLive: true, liveTitle: 'Fechando a Sweet Dreams', viewers: 217 },
  { channel: 'lootecacada', displayName: 'Loot & Caçada', isLive: false, liveTitle: null, viewers: null },
  { channel: 'mestredastasks', displayName: 'Mestre das Tasks', isLive: false, liveTitle: null, viewers: null },
];

const CHANNELS: Omit<SponsoredChannel, 'platform'>[] = [
  { name: 'Guias do Rubinot (exemplo)', url: 'https://youtube.com/@exemplo-guias' },
  { name: 'Tibia Dicas BR (exemplo)', url: 'https://youtube.com/@exemplo-dicas' },
  { name: 'OT Fields (exemplo)', url: 'https://youtube.com/@exemplo-otfields' },
];

/** Adapter MOCK dos patrocinados — dados fictícios de demonstração. */
export class MockSponsoredStreamersRepository implements SponsoredStreamersRepository {
  async fetchSponsored(): Promise<SponsoredResult> {
    const streamers: SponsoredStreamer[] = STREAMERS.map((s) => ({
      platform: 'twitch',
      url: `https://twitch.tv/${s.channel}`,
      ...s,
    }));
    const channels: SponsoredChannel[] = CHANNELS.map((c) => ({ platform: 'youtube', ...c }));
    return { streamers, channels, origin: 'exemplo', fetchedAt: new Date() };
  }
}
