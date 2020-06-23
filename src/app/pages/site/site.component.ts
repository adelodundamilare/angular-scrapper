import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TopText } from 'src/app/models/models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
  // public variables
  isLoading: boolean = false;
  isError: boolean = false;

  //
  images: string[];
  totalWordCount: string;
  topTenWords: TopText[];

  //
  public receivedUrl: string;
  private _proxyUrl: string = 'https://cors-anywhere.herokuapp.com/';
  private url: string;

  // url: string = 'https://api.proxycrawl.com/?token=NPvvzYHeinQ6Qb_BYqdhAQ&url=https://google.com&format=json&tor_network=true'
  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.receivedUrl = this._getReceivedUrl();
    this.url = `${this._proxyUrl}https://api.proxycrawl.com/?token=NPvvzYHeinQ6Qb_BYqdhAQ&url=${this.receivedUrl}/&format=json`;
    this.getSiteInfo();
  }

  _getReceivedUrl(): string {
    const url = this._route.snapshot.paramMap.get('url').split('//');
    const prefix = url[0]; //@todo: do something with this...
    return url[1];
  }

  async getSiteInfo() {
    this.isLoading = true;
    try {
      const res = await this._http.get<any>(this.url, httpOptions).toPromise();
      const parser: any = new DOMParser();
      const parsedHtml = parser.parseFromString(res.body, 'text/html');

      const computedWords: any = this._getTextNodes(parsedHtml);

      this.images = this._getSiteImages(parsedHtml);
      this.totalWordCount = this._computeTotalWords(computedWords);
      this.topTenWords = this._computeTopTenWords(computedWords);
    } catch (error) {
      this.isError = true;
      console.error(error);
    }
    this.isLoading = false;
  }

  errorHandler(event) {
    console.debug(event)
    event.target.src = '/assets/images/img-default.jpg';
  }

  _getSiteImages(document: any): string[] {
    const images = document.getElementsByTagName('img');
    return Array.from(images).map((item: any) => item.src);
  }

  _getTextNodes(document: any): any {
    const res: string[] = Array.from(
      document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span')
    )
      .map((item: any) => item.innerText.trim().toLowerCase())
      .join()
      .split(/[ \W]+/)
      .filter((item: any) => item.match(/[\D]/g));

    const result: any = res.reduce((acc, single) => {
      return {
        ...acc,
        [single]: acc[single] ? acc[single] + 1 : 1,
      };
    }, {});

    return result;
  }

  _computeTotalWords(input: any): string {
    const res = Object.values(input).reduce(
      (acc: any, single: any) => acc + single,
      0
    );
    return this._parsedNumbers(res);
  }

  _parsedNumbers(input: any): string {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //thanks @stackOverflow
  }

  _computeTopTenWords(input: any): TopText[] {
    // sort and slice/cut
    const res = Object.entries(input)
      .sort((a, b) => {
        return a[1] > b[1] ? -1 : 1;
      })
      .slice(0, 10);

    return res.map(
      (res, index) =>
        <TopText>{
          id: index + 1,
          text: res[0],
          count: this._parsedNumbers(res[1]),
        }
    );
  }
}
