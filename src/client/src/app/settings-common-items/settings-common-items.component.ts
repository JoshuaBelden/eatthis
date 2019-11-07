import { Component, OnInit } from '@angular/core';
import { CommonItems } from '../models/commonItems';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Result } from '../models/result';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonItemsService } from '../services/comonItems.service';

@Component({
  selector: 'app-settings-common-items',
  templateUrl: './settings-common-items.component.html',
  styleUrls: ['./settings-common-items.component.css']
})
export class SettingsCommonItemsComponent implements OnInit {

  commonItems: CommonItems;
  commonItemsForm;
  result: Result<CommonItems>;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label} is required!`
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonItemsService: CommonItemsService
  ) { }

  ngOnInit() {
    this.commonItemsForm = this.createFormGroup();

    this.route.paramMap.subscribe(async params => {
      this.commonItems = await this.commonItemsService.getForUserAsync();
      this.commonItemsForm = this.createFormGroup(this.commonItems);
    });
  }

  createFormGroup(commonItems?: CommonItems) {
    return this.formBuilder.group({
      id: commonItems ? commonItems.id : '',
      items: new FormControl(commonItems ? this.convertItemsToText(commonItems.items) : '', [Validators.required]),
    });
  }

  async onSubmit(commonItemsData) {
    try {
      const commonItems: CommonItems = {
        id: commonItemsData.id,
        userId: commonItemsData.userId,
        items: this.convertTextToItems(commonItemsData.items)
      };

      this.commonItems = await this.commonItemsService.updateAsync(commonItems);
      this.result = new Result<CommonItems>(true, commonItems);
    } catch (error) {
      this.result = new Result<CommonItems>(false, null, error);
    }
  }

  private convertItemsToText(items: string[]): string {
    if (!items) {
      return '';
    } else {
      return items.join('\r\n');
    }
  }

  private convertTextToItems(value: string): string[] {
    return value.split('\n').map(input => input.replace('\r', ''));
  }
}
