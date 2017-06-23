import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewslistComponent } from '../newslist/newslist.component';
import { NewsComponent } from '../news/news.component';
import { NewsService } from '../news.service';
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewslistComponent, NewsComponent, BlogComponent],
  providers: [NewsService]
})
export class BlogModule { }
