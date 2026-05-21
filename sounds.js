// =====================================================
//  sounds.js — 효과음 목록
//  새 효과음 추가: 아래 배열에 항목 하나 추가하면 끝!
//
//  형식:
//  { name:'이름', cat:'카테고리', e:'이모지', fn: 합성함수 or 'speech:텍스트' }
//
//  speech: 접두어를 붙이면 브라우저 TTS 목소리로 재생됩니다.
//  예) fn: 'speech:대박이다!'
// =====================================================

const SOUNDS = [

// ── 레트로 ──────────────────────────────────────────
{name:'8-bit 점프',     cat:'레트로', e:'🕹️', fn: c=>sweep(c,'square',220,880,.15,.4)},
{name:'코인 획득',      cat:'레트로', e:'🪙',  fn: c=>osc(c,'square',[523,659,784,1047],.07,.3)},
{name:'레이저 빔',      cat:'레트로', e:'⚡',  fn: c=>sweep(c,'sawtooth',1800,200,.4)},
{name:'파워업',         cat:'레트로', e:'⭐',  fn: c=>osc(c,'square',[220,277,330,440,554,659,880],.06,.25)},
{name:'게임오버',       cat:'레트로', e:'💀',  fn: c=>osc(c,'square',[440,330,220,110],.12,.4)},
{name:'워프',           cat:'레트로', e:'🌀',  fn: c=>{sweep(c,'sine',100,2000,.3,.3);setTimeout(()=>sweep(c,'sine',2000,100,.3,.3),300)}},
{name:'1UP',            cat:'레트로', e:'🍄',  fn: c=>osc(c,'square',[523,659,784,1047,1319],.08,.3)},
{name:'보스 등장',      cat:'레트로', e:'👾',  fn: c=>osc(c,'sawtooth',[110,146,165,110,131,110],.12,.4)},
{name:'체력 회복',      cat:'레트로', e:'❤️',  fn: c=>osc(c,'sine',[523,784,1047,784,523],.08,.25)},
{name:'스테이지 클리어',cat:'레트로', e:'🏆',  fn: c=>melody(c,'square',[[523,.1,0],[659,.1,.1],[784,.1,.2],[1047,.3,.3]])},
{name:'픽셀 죽음',      cat:'레트로', e:'☠️',  fn: c=>{[440,415,392,370,349,330,311,294,277,261].forEach((f,i)=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime+i*.05);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+i*.05+.08);g.connect(c.destination);let o=c.createOscillator();o.type='square';o.frequency.value=f;o.connect(g);o.start(c.currentTime+i*.05);o.stop(c.currentTime+i*.05+.08)})}},
{name:'경험치 업',      cat:'레트로', e:'📈',  fn: c=>melody(c,'square',[[330,.07,0],[392,.07,.08],[494,.07,.16],[659,.07,.24],[784,.15,.32]])},
{name:'비밀 발견',      cat:'레트로', e:'🔍',  fn: c=>melody(c,'sine',[[523,.1,0],[659,.1,.12],[784,.1,.24],[1047,.3,.38]])},
{name:'점멸',           cat:'레트로', e:'💫',  fn: c=>{for(let k=0;k<6;k++){let g=c.createGain();g.gain.setValueAtTime(.25,c.currentTime+k*.07);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.07+.05);g.connect(c.destination);let o=c.createOscillator();o.type='square';o.frequency.value=k%2?880:440;o.connect(g);o.start(c.currentTime+k*.07);o.stop(c.currentTime+k*.07+.05)}}},
{name:'버튼 확인',      cat:'레트로', e:'🔘',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.4,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.08);g.connect(c.destination);let o=c.createOscillator();o.type='square';o.frequency.value=660;o.connect(g);o.start();o.stop(c.currentTime+.08)}},

// ── 액션 ────────────────────────────────────────────
{name:'폭발',           cat:'액션',   e:'💥',  fn: c=>noise(c,.8,400,1)},
{name:'총소리',         cat:'액션',   e:'🎯',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.8,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.3);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.3,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=800;f.Q.value=.5;s.connect(f);f.connect(g);s.start()}},
{name:'번개',           cat:'액션',   e:'🌩️', fn: c=>sweep(c,'sawtooth',60,30,.6,.6)},
{name:'로켓 발사',      cat:'액션',   e:'🚀',  fn: c=>noiseEnv(c,1,200,.2,.8,.5)},
{name:'충돌',           cat:'액션',   e:'💢',  fn: c=>noise(c,.25,600,.9)},
{name:'칼 휘두르기',    cat:'액션',   e:'⚔️',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.25);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.25,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(i/d.length,.2)*Math.pow(1-i/d.length,3);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='highpass';f.frequency.value=2000;s.connect(f);f.connect(g);s.start()}},
{name:'펀치',           cat:'액션',   e:'🥊',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.7,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.15);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.15,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,1.5);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=1500;s.connect(f);f.connect(g);s.start()}},
{name:'마법 시전',      cat:'액션',   e:'🪄',  fn: c=>{sweep(c,'sine',400,2000,.4,.25);setTimeout(()=>noise(c,.3,6000,.3),200)}},
{name:'전기 충격',      cat:'액션',   e:'⚡',  fn: c=>{for(let k=0;k<4;k++)setTimeout(()=>noise(c,.08,8000,.5),k*60)}},
{name:'화염방사',       cat:'액션',   e:'🔥',  fn: c=>noiseEnv(c,1,2000,.1,.7,.25)},
{name:'낙하',           cat:'액션',   e:'⬇️',  fn: c=>sweep(c,'sawtooth',800,100,.5,.4)},

// ── 자연 ────────────────────────────────────────────
{name:'빗소리',         cat:'자연',   e:'🌧️', fn: c=>noiseEnv(c,1.2,4000,.1,.9,.15)},
{name:'천둥',           cat:'자연',   e:'⛈️',  fn: c=>noise(c,1.5,300,.9)},
{name:'파도',           cat:'자연',   e:'🌊',  fn: c=>noiseEnv(c,1.5,800,.5,1,.2)},
{name:'새소리',         cat:'자연',   e:'🐦',  fn: c=>{[[880,1.2,0],[1046,1.35,.15],[784,1.1,.3]].forEach(([f,r,d])=>{let g=c.createGain();g.gain.setValueAtTime(.15,c.currentTime+d);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d+.2);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(f,c.currentTime+d);o.frequency.exponentialRampToValueAtTime(f*r,c.currentTime+d+.1);o.frequency.exponentialRampToValueAtTime(f,c.currentTime+d+.2);o.connect(g);o.start(c.currentTime+d);o.stop(c.currentTime+d+.2)})}},
{name:'바람',           cat:'자연',   e:'💨',  fn: c=>noiseEnv(c,1.2,600,.3,.7,.12)},
{name:'모닥불',         cat:'자연',   e:'🔥',  fn: c=>noiseEnv(c,1.2,1500,.2,.9,.1)},
{name:'지진',           cat:'자연',   e:'🌍',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.6,c.currentTime+.3);g.gain.setValueAtTime(.6,c.currentTime+1);g.gain.linearRampToValueAtTime(0,c.currentTime+1.5);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=30;let lfo=c.createOscillator();let lg=c.createGain();lg.gain.value=10;lfo.frequency.value=6;lfo.connect(lg);lg.connect(o.frequency);let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=150;o.connect(f);f.connect(g);lfo.start();o.start();lfo.stop(c.currentTime+1.5);o.stop(c.currentTime+1.5)}},
{name:'귀뚜라미',       cat:'자연',   e:'🦗',  fn: c=>{for(let k=0;k<8;k++){let g=c.createGain();g.gain.setValueAtTime(.1,c.currentTime+k*.1);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.1+.08);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=4200+Math.random()*300;o.connect(g);o.start(c.currentTime+k*.1);o.stop(c.currentTime+k*.1+.08)}}},
{name:'눈보라',         cat:'자연',   e:'❄️',  fn: c=>noiseEnv(c,1.5,2000,.3,1,.12)},
{name:'화산',           cat:'자연',   e:'🌋',  fn: c=>noise(c,1.5,200,.8)},
{name:'폭포',           cat:'자연',   e:'🏞️', fn: c=>noiseEnv(c,1.5,3000,.1,1.2,.2)},

// ── 유머 ────────────────────────────────────────────
{name:'삐~ 경고',       cat:'유머',   e:'🚨',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.setValueAtTime(.3,c.currentTime+.4);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.45);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=1000;o.connect(g);o.start();o.stop(c.currentTime+.45)}},
{name:'뿅',             cat:'유머',   e:'🤪',  fn: c=>sweep(c,'sine',400,100,.3,.4)},
{name:'실패',           cat:'유머',   e:'😭',  fn: c=>osc(c,'sawtooth',[392,349,330,294],.1,.35)},
{name:'박수',           cat:'유머',   e:'👏',  fn: c=>{for(let k=0;k<3;k++)setTimeout(()=>{let g=c.createGain();g.gain.setValueAtTime(.5,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.1);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.1,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1200;s.connect(f);f.connect(g);s.start();},k*180)}},
{name:'경적',           cat:'유머',   e:'📯',  fn: c=>chord(c,'sawtooth',[262,330,392],.5,.4)},
{name:'방귀',           cat:'유머',   e:'💩',  fn: c=>sweep(c,'sawtooth',80,40,.4,.5)},
{name:'드르렁',         cat:'유머',   e:'😴',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.3,c.currentTime+.3);g.gain.setValueAtTime(.3,c.currentTime+.7);g.gain.linearRampToValueAtTime(0,c.currentTime+1);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.value=120;let lfo=c.createOscillator();let lg=c.createGain();lg.gain.value=40;lfo.frequency.value=3;lfo.connect(lg);lg.connect(o.frequency);let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=400;o.connect(f);f.connect(g);lfo.start();o.start();lfo.stop(c.currentTime+1);o.stop(c.currentTime+1)}},
{name:'딸꾹',           cat:'유머',   e:'🤭',  fn: c=>{for(let k=0;k<2;k++){let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime+k*.4);g.gain.linearRampToValueAtTime(.5,c.currentTime+k*.4+.02);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.4+.15);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(300,c.currentTime+k*.4);o.frequency.exponentialRampToValueAtTime(150,c.currentTime+k*.4+.15);o.connect(g);o.start(c.currentTime+k*.4);o.stop(c.currentTime+k*.4+.15)}}},
{name:'찰싹',           cat:'유머',   e:'👋',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.6,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.12);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.12,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;f.Q.value=1;s.connect(f);f.connect(g);s.start()}},
{name:'꽥',             cat:'유머',   e:'🦆',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.4,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.25);g.connect(c.destination);let o=c.createOscillator();o.type='square';o.frequency.setValueAtTime(600,c.currentTime);o.frequency.exponentialRampToValueAtTime(300,c.currentTime+.25);let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=800;f.Q.value=2;o.connect(f);f.connect(g);o.start();o.stop(c.currentTime+.25)}},
{name:'빠른 박수',      cat:'유머',   e:'🙌',  fn: c=>{for(let k=0;k<8;k++)setTimeout(()=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.06);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.06,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1200;s.connect(f);f.connect(g);s.start();},k*80)}},

// ── 악기 ────────────────────────────────────────────
{name:'피아노',         cat:'악기',   e:'🎹',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.5,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1.2);g.connect(c.destination);[261.6,523.2,784.9].forEach((f,i)=>{let o=c.createOscillator();o.type='sine';o.frequency.value=f;let og=c.createGain();og.gain.value=[1,.5,.25][i];o.connect(og);og.connect(g);o.start();o.stop(c.currentTime+1.2)})}},
{name:'드럼 킥',        cat:'악기',   e:'🥁',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(1,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.4);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(150,c.currentTime);o.frequency.exponentialRampToValueAtTime(40,c.currentTime+.15);o.connect(g);o.start();o.stop(c.currentTime+.4)}},
{name:'스네어',         cat:'악기',   e:'🪘',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.6,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.2);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=2000;f.Q.value=.7;s.connect(f);f.connect(g);s.start()}},
{name:'심벌즈',         cat:'악기',   e:'🎵',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.6);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.6,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='highpass';f.frequency.value=8000;s.connect(f);f.connect(g);s.start()}},
{name:'기타 리프',      cat:'악기',   e:'🎸',  fn: c=>osc(c,'sawtooth',[220,293,330,370,330,293],.1,.3)},
{name:'트럼펫',         cat:'악기',   e:'🎺',  fn: c=>chord(c,'sawtooth',[523,659,784],.5,.4)},
{name:'벨',             cat:'악기',   e:'🔔',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.5,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1.5);g.connect(c.destination);[1047,2093,3136].forEach((f,i)=>{let o=c.createOscillator();o.type='sine';o.frequency.value=f;let og=c.createGain();og.gain.value=[1,.4,.2][i];o.connect(og);og.connect(g);o.start();o.stop(c.currentTime+1.5)})}},
{name:'드럼롤',         cat:'악기',   e:'🥁',  fn: c=>{for(let k=0;k<16;k++)setTimeout(()=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.04);g.connect(c.destination);let b=c.createBuffer(1,c.sampleRate*.04,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,1.5);let s=c.createBufferSource();s.buffer=b;let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=2000;s.connect(f);f.connect(g);s.start();},k*50)}},
{name:'베이스 드롭',    cat:'악기',   e:'🔊',  fn: c=>sweep(c,'sine',80,40,.8,.7)},
{name:'하프',           cat:'악기',   e:'🪗',  fn: c=>melody(c,'sine',[[523,.4,0],[659,.35,.12],[784,.3,.22],[988,.3,.32],[1175,.35,.42],[1319,.4,.52]])},
{name:'마림바',         cat:'악기',   e:'🎵',  fn: c=>melody(c,'sine',[[523,.3,0],[784,.3,.2],[1047,.3,.4],[784,.2,.6],[523,.4,.8]])},

// ── 동물 ────────────────────────────────────────────
{name:'개 짖음',        cat:'동물',   e:'🐶',  fn: c=>{[[200,150,0],[220,160,.35]].forEach(([s,e,d])=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime+d);g.gain.linearRampToValueAtTime(.5,c.currentTime+d+.05);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d+.25);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(s,c.currentTime+d);o.frequency.exponentialRampToValueAtTime(e,c.currentTime+d+.25);let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=600;f.Q.value=2;o.connect(f);f.connect(g);o.start(c.currentTime+d);o.stop(c.currentTime+d+.25)})}},
{name:'고양이',         cat:'동물',   e:'🐱',  fn: c=>sweep(c,'sine',700,650,.7,.2)},
{name:'개구리',         cat:'동물',   e:'🐸',  fn: c=>{for(let k=0;k<2;k++){let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime+k*.2);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.2+.1);g.connect(c.destination);let o=c.createOscillator();o.type='square';o.frequency.setValueAtTime(300,c.currentTime+k*.2);o.frequency.exponentialRampToValueAtTime(180,c.currentTime+k*.2+.1);o.connect(g);o.start(c.currentTime+k*.2);o.stop(c.currentTime+k*.2+.1)}}},
{name:'늑대 울음',      cat:'동물',   e:'🐺',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.4,c.currentTime+.3);g.gain.setValueAtTime(.4,c.currentTime+.8);g.gain.linearRampToValueAtTime(0,c.currentTime+1.4);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(180,c.currentTime);o.frequency.exponentialRampToValueAtTime(600,c.currentTime+.5);o.frequency.exponentialRampToValueAtTime(300,c.currentTime+1.4);let f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=800;f.Q.value=1;o.connect(f);f.connect(g);o.start();o.stop(c.currentTime+1.4)}},
{name:'공룡',           cat:'동물',   e:'🦖',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.7,c.currentTime+.1);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(60,c.currentTime);o.frequency.exponentialRampToValueAtTime(30,c.currentTime+.5);let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=400;o.connect(f);f.connect(g);o.start();o.stop(c.currentTime+1)}},
{name:'사자',           cat:'동물',   e:'🦁',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.8,c.currentTime+.2);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1.2);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(80,c.currentTime);o.frequency.exponentialRampToValueAtTime(40,c.currentTime+.8);let lfo=c.createOscillator();let lg=c.createGain();lg.gain.value=15;lfo.frequency.value=4;lfo.connect(lg);lg.connect(o.frequency);let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=500;o.connect(f);f.connect(g);lfo.start();o.start();lfo.stop(c.currentTime+1.2);o.stop(c.currentTime+1.2)}},
{name:'코끼리',         cat:'동물',   e:'🐘',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.5,c.currentTime+.1);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1);g.connect(c.destination);let o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(200,c.currentTime);o.frequency.exponentialRampToValueAtTime(400,c.currentTime+.3);o.frequency.exponentialRampToValueAtTime(100,c.currentTime+1);let f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=600;o.connect(f);f.connect(g);o.start();o.stop(c.currentTime+1)}},
{name:'올빼미',         cat:'동물',   e:'🦉',  fn: c=>{[[350,320,0],[350,320,.4]].forEach(([s,e,d])=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime+d);g.gain.linearRampToValueAtTime(.2,c.currentTime+d+.05);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d+.25);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(s,c.currentTime+d);o.frequency.exponentialRampToValueAtTime(e,c.currentTime+d+.25);o.connect(g);o.start(c.currentTime+d);o.stop(c.currentTime+d+.25)})}},
{name:'돌고래',         cat:'동물',   e:'🐬',  fn: c=>sweep(c,'sine',1200,2400,.3,.15)},
{name:'고래',           cat:'동물',   e:'🐋',  fn: c=>sweep(c,'sine',300,80,1.5,.2)},

// ── SF ──────────────────────────────────────────────
{name:'UFO',            cat:'SF',     e:'🛸',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(.2,c.currentTime);g.gain.linearRampToValueAtTime(0,c.currentTime+1.2);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=400;let lfo=c.createOscillator();let lg=c.createGain();lg.gain.value=50;lfo.frequency.value=5;lfo.connect(lg);lg.connect(o.frequency);o.connect(g);lfo.start();o.start();lfo.stop(c.currentTime+1.2);o.stop(c.currentTime+1.2)}},
{name:'포털',           cat:'SF',     e:'🌌',  fn: c=>{sweep(c,'sine',200,800,.4,.4);setTimeout(()=>sweep(c,'sine',800,200,.8,.3),400)}},
{name:'로봇',           cat:'SF',     e:'🤖',  fn: c=>osc(c,'square',[100,150,200,150,100],.1,.3)},
{name:'텔레포트',       cat:'SF',     e:'✨',  fn: c=>noise(c,.2,5000,.5)},
{name:'블랙홀',         cat:'SF',     e:'🕳️', fn: c=>sweep(c,'sawtooth',4000,20,1.5,.5)},
{name:'에너지 충전',    cat:'SF',     e:'⚡',  fn: c=>sweep(c,'sine',100,2000,1,.3)},
{name:'홀로그램',       cat:'SF',     e:'🔮',  fn: c=>{let g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.2,c.currentTime+.15);g.gain.setValueAtTime(.2,c.currentTime+.6);g.gain.linearRampToValueAtTime(0,c.currentTime+.8);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=880;let lfo=c.createOscillator();let lg=c.createGain();lg.gain.value=400;lfo.frequency.value=3;lfo.connect(lg);lg.connect(o.frequency);o.connect(g);lfo.start();o.start();lfo.stop(c.currentTime+.8);o.stop(c.currentTime+.8)}},
{name:'타임머신',       cat:'SF',     e:'⏳',  fn: c=>{for(let k=0;k<6;k++){let g=c.createGain();g.gain.setValueAtTime(.15,c.currentTime+k*.15);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.15+.1);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=200+k*150;o.connect(g);o.start(c.currentTime+k*.15);o.stop(c.currentTime+k*.15+.1)}}},

// ── UI ──────────────────────────────────────────────
{name:'알림',           cat:'UI',     e:'🔔',  fn: c=>osc(c,'sine',[880,1108],.12,.25)},
{name:'성공',           cat:'UI',     e:'✅',  fn: c=>osc(c,'sine',[523,659,784,1047],.08,.2)},
{name:'에러',           cat:'UI',     e:'❌',  fn: c=>osc(c,'sawtooth',[300,250],.15,.3)},
{name:'클릭',           cat:'UI',     e:'🖱️', fn: c=>noise(c,.06,5000,.3)},
{name:'카운트다운',     cat:'UI',     e:'⏱️', fn: c=>{for(let k=0;k<3;k++){let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime+k*.5);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+k*.5+.15);g.connect(c.destination);let o=c.createOscillator();o.type='sine';o.frequency.value=k===2?1046:523;o.connect(g);o.start(c.currentTime+k*.5);o.stop(c.currentTime+k*.5+.15)}}},
{name:'전화벨',         cat:'UI',     e:'📱',  fn: c=>{for(let k=0;k<2;k++)setTimeout(()=>{let g=c.createGain();g.gain.setValueAtTime(.3,c.currentTime);g.gain.setValueAtTime(.3,c.currentTime+.3);g.gain.linearRampToValueAtTime(0,c.currentTime+.4);g.connect(c.destination);[880,1100].forEach(f=>{let o=c.createOscillator();o.type='sine';o.frequency.value=f;o.connect(g);o.start();o.stop(c.currentTime+.4)});},k*700)}},
{name:'카메라 셔터',    cat:'UI',     e:'📷',  fn: c=>{noise(c,.06,8000,.5);setTimeout(()=>noise(c,.04,6000,.3),80)}},

// ── 밈 (목소리) ──────────────────────────────────────
// speech: 접두어 = 브라우저 TTS로 한국어 목소리 재생
{name:'대박',           cat:'밈',     e:'🤩',  fn: 'speech:대박!'},
{name:'헐',             cat:'밈',     e:'😲',  fn: 'speech:헐'},
{name:'실화냐',         cat:'밈',     e:'🫢',  fn: 'speech:실화임?'},
{name:'아 진짜',        cat:'밈',     e:'😤',  fn: 'speech:아 진짜!'},
{name:'오 마이 갓',     cat:'밈',     e:'😇',  fn: 'speech:오 마이 갓!'},
{name:'레전드',         cat:'밈',     e:'👑',  fn: 'speech:레게노!'},
{name:'노답',           cat:'밈',     e:'🤦',  fn: 'speech:노답이야'},
{name:'킹받네',         cat:'밈',     e:'😡',  fn: 'speech:킹받네'},
{name:'갑분싸',         cat:'밈',     e:'🥶',  fn: 'speech:갑분싸'},
{name:'핵꿀잼',         cat:'밈',     e:'🤣',  fn: 'speech:핵꿀잼이다!'},
{name:'ㅋㅋㅋ',         cat:'밈',     e:'😹',  fn: 'speech:크크크'},
{name:'존맛탱',         cat:'밈',     e:'😍',  fn: 'speech:존맛탱'},
{name:'어이쿠',         cat:'밈',     e:'🙈',  fn: 'speech:어이쿠!'},
{name:'아이고',         cat:'밈',     e:'😩',  fn: 'speech:아이고'},
{name:'잠깐만요',       cat:'밈',     e:'✋',  fn: 'speech:잠깐만요!'},
{name:'진짜요?',        cat:'밈',     e:'🧐',  fn: 'speech:진짜요?'},
{name:'대단해',         cat:'밈',     e:'👏',  fn: 'speech:대단해!'},
{name:'미쳤다',         cat:'밈',     e:'🤯',  fn: 'speech:미쳤다!'},
{name:'갓생',           cat:'밈',     e:'✨',  fn: 'speech:갓생!'},
{name:'솔직히',         cat:'밈',     e:'🙋',  fn: 'speech:솔직히'},
{name:'TMI',        cat:'밈',     e:'💬',  fn: 'speech:TMI'},
{name:'빠라빠빠',       cat:'밈',     e:'🍟',  fn: 'speech:빠라빠빠빠'},
{name:'칼퇴',           cat:'밈',     e:'🏃',  fn: 'speech:칼퇴가즈아'},
{name:'야 이게 뭐야',   cat:'밈',     e:'😵',  fn: 'speech:예?'},
{name:'대충 살자',      cat:'밈',     e:'🛋️', fn: 'speech:대충 살자'},
{name:'쌰갈',      cat:'밈',     e:'🛋️', fn: 'speech:쌰갈'},
{name:'저 됐어요',      cat:'밈',     e:'🛋️', fn: 'speech:저 됐어요'},

];
