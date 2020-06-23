import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  @Input() isHeader: boolean;
  @Input() receivedUrl: string = 'website.com';

  showOptions: boolean = false;
  hasError: boolean = false;
  selected: string;
  options: string[] = ['https', 'http'];
  urlInput: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this.selected = this.options[0];
  }

  showChangeOptions() {
    this.showOptions = !this.showOptions;
  }

  setNewOption(item: string) {
    this.showOptions = false;
    this.selected = item;
  }

  onSubmit() {
    if (!this._validateInputs()) return;
    const url = this._serializeUrl();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.navigate(['/site', { url: url }]);
  }

  _serializeUrl(): string {
    if (/^(f|ht)tps?:\/\//i.test(this.urlInput)) {
      return this.urlInput;
    }
    return `${this.selected}://${this.urlInput}`;
  }

  onChange(newValue) {
    this.hasError = false;
  }

  _validateInputs(): boolean {
    if (!this.urlInput) {
      this.hasError = true;
      return false;
    }

    return true;
  }
}
