// ============================================
// TIPOS DEL SISTEMA DE TEMPLATES
// ============================================

// Tipos de slides
export type SlideType = 'hook' | 'body' | 'cta';

// Contenido de un slide generado por IA
export interface SlideContent {
  type: SlideType;
  number?: string; // "01", "02", etc. (solo para body)
  label?: string; // Etiqueta/categoría (ej: "Tutorial", "Consejo")
  title?: string;
  tag?: string; // TAG opcional para el slide
  body?: string;
  cta_text?: string;
}

// Brand Kit del usuario
export interface BrandKit {
  logo_url?: string;
  show_logo: boolean;
  author_handle?: string;
  show_author: boolean;
  website?: string;
  show_website: boolean;
  primary_color: string; // hex
  secondary_color: string; // hex
}

// User Identity (para rendering)
export interface UserIdentity {
  logo: string | null; // Base64 o URL
  author: string;
  website: string;
  showLogo: boolean;
  showAuthor: boolean;
  showWebsite: boolean;
}

// ============================================
// AI GENERATED CONTENT
// ============================================

export interface GeneratedContent {
  hook: {
    label?: string;
    title: string;
  };
  body: Array<{
    title: string;
    content: string;
  }>;
  cta: {
    title: string;
    action: string;
  };
}

// ============================================
// SLIDE DATA FOR RENDERING
// ============================================

export interface SlideData {
  type: 'hook' | 'body' | 'cta';
  slideNumber: number;
  totalSlides: number;
  content: {
    label?: string;
    title: string;
    tag?: string;
    body?: string;
    action?: string;
  };
  template: Template;
  brandKit: BrandKit;
  userIdentity: UserIdentity;
}


// ============================================
// ELEMENTOS DE DISEÑO
// ============================================

export type DesignElementType = 'circle' | 'rectangle' | 'line' | 'path' | 'svg';

export interface BaseDesignElement {
  id: string;
  type: DesignElementType;
  zIndex: number;
  opacity?: number;
}

export interface CircleElement extends BaseDesignElement {
  type: 'circle';
  cx: number;
  cy: number;
  radius: number;
  fill: string; // hex o 'brand_primary' | 'brand_secondary'
  stroke?: string;
  strokeWidth?: number;
}

export interface RectangleElement extends BaseDesignElement {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  borderRadius?: number;
}

export interface LineElement extends BaseDesignElement {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
}

export interface PathElement extends BaseDesignElement {
  type: 'path';
  d: string; // SVG path data
  fill: string;
}

export interface SVGElement extends BaseDesignElement {
  type: 'svg';
  x: number;
  y: number;
  width: number;
  height: number;
  svgCode: string;
  tinted?: boolean; // Si aplica color de marca
  colorVar?: 'brand_primary' | 'brand_secondary'; // Para backward compatibility
  rotation?: number;
}

export type DesignElement =
  | CircleElement
  | RectangleElement
  | LineElement
  | PathElement
  | SVGElement;

// ============================================
// TEXT SLOTS
// ============================================

export interface TextSlot {
  enabled: boolean;

  // Posición y dimensiones
  x: number;
  y: number;
  width: number;
  height: number;

  // Tipografía
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  color: string; // hex o 'auto-contrast' | 'brand_primary' | 'brand_secondary'

  // Alineación
  textAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';

  // Espaciado
  lineHeight: number;
  letterSpacing: number;

  // Transformaciones
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  // Auto-ajuste
  autoFit?: boolean;
  minFontSize?: number;
  maxLines?: number;

  // Estilos especiales
  zIndex: number;
  opacity?: number;

  // Para énfasis (palabras entre **)
  emphasisStyle?: {
    fontWeight: number | string;
    color: string;
    backgroundColor?: string;
    backgroundOpacity?: number;
  };

  // Número de formato (para slide_number)
  numberFormat?: string; // '01' | '1' | '1/10'

  // Prefix (para author/website)
  prefix?: string; // '@'
}

export interface TextSlots {
  slide_number?: TextSlot;
  label?: TextSlot;
  tag?: TextSlot;
  title?: TextSlot;
  body?: TextSlot;
  cta_text?: TextSlot;
}

// ============================================
// GLOBAL SLOTS
// ============================================

export interface LogoSlot {
  enabled: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  fit: 'contain' | 'cover';
  borderRadius: number;
  opacity: number;
  zIndex: number;
}

export interface GlobalSlots {
  logo?: LogoSlot;
  author?: TextSlot;
  website?: TextSlot;
}

// ============================================
// BACKGROUND
// ============================================

export interface Background {
  type: 'solid' | 'gradient';
  colorVar: string; // 'brand_primary' | 'brand_secondary' | hex

  // Opcional para gradient
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number; // degrees (para linear)
    stops: Array<{
      offset: number; // 0-1
      color: string;
    }>;
  };
}

// ============================================
// TEMPLATE COMPLETO
// ============================================

export interface TemplateMetadata {
  name: string;
  category: 'minimal' | 'bold' | 'modern' | 'swiss' | 'playful';
  colorSupport: 0 | 1 | 2; // 0=no brand, 1=primary, 2=primary+secondary
  description: string;
  tags: string[];
}

export interface Viewport {
  width: 1080;
  height: 1350;
  safeMargin: 60;
}

export interface TemplateVariation {
  background?: Background;
  design_elements?: DesignElement[];
  text_slots?: Partial<TextSlots>;
  global_slots?: Partial<GlobalSlots>;
}

export interface Template {
  id: string;
  metadata: TemplateMetadata;
  viewport: Viewport;
  background: Background;
  design_elements: DesignElement[];
  text_slots: TextSlots;
  global_slots: GlobalSlots;
  variations?: {
    hook?: TemplateVariation;
    cta?: TemplateVariation;
  };
}

// ============================================
// ESTADO GLOBAL (ZUSTAND)
// ============================================

export interface CarouselState {
  // Slides generados por IA
  slides: SlideContent[];
  currentSlideIndex: number;

  // Template seleccionado
  templateId: string;

  // Brand Kit
  brandKit: BrandKit;

  // Actions
  setSlides: (slides: SlideContent[]) => void;
  setCurrentSlide: (index: number) => void;
  setTemplate: (templateId: string) => void;
  setBrandKit: (brandKit: Partial<BrandKit>) => void;
  reset: () => void;
}

// ============================================
// RESPUESTA DE CLAUDE API
// ============================================

export interface ClaudeCarouselResponse {
  slides: SlideContent[];
}

// ============================================
// UTILITY TYPES
// ============================================

export interface AutoFitResult {
  fontSize: number;
  text: string;
  truncated: boolean;
}

export interface TextSegment {
  text: string;
  emphasized: boolean;
}

export interface WordWithStyle {
  text: string;
  emphasized: boolean;
}
