import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly aiServiceUrl = 'http://localhost:8000';

  async diagnoseIssue(description: string, issueType: string) {
    const response = await axios.post(`${this.aiServiceUrl}/diagnose`, {
      description,
      issue_type: issueType,
    });
    return response.data;
  }
}
