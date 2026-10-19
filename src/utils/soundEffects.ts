// Procedural Web Audio API sound generator for luxury salon experience
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft crystalline bell tone for 3D perfume and preset interactions
  public playCrystalChime(freq = 880) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Warm Moroccan brass bowl resonance
  public playBowlTone() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const baseFreq = 261.63; // C4
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.76, this.ctx.currentTime); // subtle metallic overtone

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.0);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 2.0);
      osc2.stop(this.ctx.currentTime + 2.0);
    } catch {
      // Fallback
    }
  }

  // Ambient luxury sanctuary harmonic drone
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  private startAmbient() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 2.0);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientGain?.disconnect();
        } catch {
          // cleanup
        }
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 850);
    } else {
      this.isAmbientPlaying = false;
    }
  }
}

export const sounds = new SoundEngine();
