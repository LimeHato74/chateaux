import { pipeline, env } from '@xenova/transformers';
import { syllabusNodes, careerNodes } from '../data/mockData.js';

// Optimizations for browser usage
env.allowLocalModels = false;
env.useBrowserCache = true;

export class SemanticEngine {
  constructor() {
    this.extractor = null;
    this.isReady = false;
    this.syllabusEmbeddings = [];
  }

  async init(onProgress) {
    try {
      // Use a lightweight model for feature extraction
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        progress_callback: onProgress
      });
      
      // Pre-compute embeddings for mock data
      await this._precomputeEmbeddings();
      
      this.isReady = true;
      console.log('Semantic Engine Ready.');
    } catch (err) {
      console.error('Failed to initialize SemanticEngine:', err);
    }
  }

  async _precomputeEmbeddings() {
    this.syllabusEmbeddings = [];
    for (const node of syllabusNodes) {
      // Combine title, description, and tags for a rich semantic representation
      const text = `${node.title}. ${node.description} Keywords: ${node.tags.join(', ')}`;
      const output = await this.extractor(text, { pooling: 'mean', normalize: true });
      this.syllabusEmbeddings.push({
        id: node.id,
        node: node,
        vector: Array.from(output.data)
      });
    }
  }

  async findMatch(userInput) {
    if (!this.isReady) throw new Error('Semantic Engine not initialized');

    // Embed user input
    const output = await this.extractor(userInput, { pooling: 'mean', normalize: true });
    const userVector = Array.from(output.data);

    // Calculate cosine similarity against all syllabus nodes
    let bestMatch = null;
    let highestScore = -1;

    for (const item of this.syllabusEmbeddings) {
      const score = this._cosineSimilarity(userVector, item.vector);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item.node;
      }
    }

    // Find corresponding career
    const career = careerNodes.find(c => c.matches.includes(bestMatch.id)) || careerNodes[0];

    return {
      syllabus: bestMatch,
      career: career,
      confidence: highestScore
    };
  }

  _cosineSimilarity(vecA, vecB) {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
