import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { firebaseAuthApp } from '../../firebase.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit, OnDestroy {
  activeTab: string = 'cajas';
  cajas: any[] = [];
  userMessage: string = '';
  messages: any[] = [];
  user: any = null;
  chatScriptLoaded: boolean = false;

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCajas();
  }

  ngOnDestroy(): void {
    this.removeChatScript();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'chatbot' && !this.chatScriptLoaded) {
      this.loadChatScript();
    } else if (tab !== 'chatbot') {
      this.removeChatScript();
    }
  }

  async loadUserData(): Promise<void> {
    const auth = getAuth(firebaseAuthApp );
    const firestore = getFirestore(firebaseAuthApp );
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        this.user = userDoc.data();
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  async loadCajas(): Promise<void> {
    const auth = getAuth(firebaseAuthApp );
    const user = auth.currentUser;

    if (!user) {
      console.log('Usuario no autenticado');
      return;
    }

    const firestore = getFirestore(firebaseAuthApp );
    const cajasCollection = collection(firestore, 'cajas');

    // Filtrar cajas por el usuario actual
    const q = query(cajasCollection, where('usuarioId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    this.cajas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, isUser: true });
      this.getChatbaseResponse(this.userMessage);
      this.userMessage = '';
    }
  }

  getChatbaseResponse(userMessage: string): void {
    const chatbase = (window as any).chatbase;
    if (chatbase) {
      chatbase('send', {
        message: userMessage,
        user: this.user?.id || 'anonimo',
        bot_id: 'M8_v-4zedtMcmD5UbHAOU',
        success: (response: any) => {
          this.messages.push({ text: response.text, isUser: false });
        },
        error: (err: any) => {
          console.error('Error al obtener respuesta del bot:', err);
        }
      });
    } else {
      console.error('Chatbase no está definido en window');
    }
  }

  loadChatScript(): void {
    if (!document.getElementById('chatbase-script')) {
      const script = this.renderer.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'chatbase-script';
      script.dataset.botId = 'M8_v-4zedtMcmD5UbHAOU';
      script.dataset.domain = 'www.chatbase.co';
      script.onload = () => {
        this.chatScriptLoaded = true;
        this.insertChatbot();
      };
      this.renderer.appendChild(document.body, script);
    } else {
      this.insertChatbot();
    }
  }

  insertChatbot(): void {
    setTimeout(() => {
      const chatbotIframe = document.querySelector("iframe[data-bot-id='M8_v-4zedtMcmD5UbHAOU']") as HTMLIFrameElement | null;

      if (chatbotIframe) {
        chatbotIframe.style.width = "100%";
        chatbotIframe.style.height = "100%";
        chatbotIframe.style.border = "none"; 

        const chatbotContainer = this.elRef.nativeElement.querySelector("#chatbot-container");
        if (chatbotContainer && !chatbotContainer.contains(chatbotIframe)) {
          chatbotContainer.appendChild(chatbotIframe);
        }
      } else {
        console.warn("No se encontró el iframe del chatbot.");
      }
    }, 2500);
  }

  removeChatScript(): void {
    const script = document.getElementById('chatbase-script');
    if (script) {
      script.remove();
      this.chatScriptLoaded = false;
    }

    const chatbotIframe = document.querySelector("iframe[data-bot-id='M8_v-4zedtMcmD5UbHAOU']") as HTMLIFrameElement | null;
    if (chatbotIframe) {
      chatbotIframe.remove();
    }
  }

  goToUserInterface(): void {
    this.router.navigate(['/interface-user']);
  }

  goToChatbot(): void {
    this.router.navigate(['/chatbot']);
  }

  goToConfig(): void {
    this.router.navigate(['/config']);
  }

  goToAddBox(): void {
    this.router.navigate(['/addbox']);
  }

  goToBoxInfo(cajaNombre: string): void {
    this.router.navigate(['/box-info', cajaNombre]);
  }
}
