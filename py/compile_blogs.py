import os, json
import html.parser as parser

BLOG_LOCATION = "./blogs/"

class BlogParser(parser.HTMLParser):
    
    def handle_starttag(self, tag, attrs):
        
        self.current_tag = (tag, attrs)
        for attr in attrs:
            if tag=="meta":
                if attr == ('name', 'author'):
                    self.author = attrs[1][1]
                elif attr == ('name', 'description'):
                    self.description = attrs[1][1]

    def handle_data(self, data):
        if data.isspace(): return
        # print(self.current_tag)
        # print("\tdata", data[:40])
        if self.current_tag == ('h1', [('id', 'title-text')]):
            self.title = data
        elif self.current_tag == ('h2', [('id', 'datetime-text')]):
            self.datetime = data[8:]

    def get_blog_metadata(self, filename):
        
        self.author, self.description, self.title, self.datetime = None, None, None, None
        with open(filename, "r") as html_file:
            html_content = html_file.read()
            self.feed(html_content)
            metadata = {
                'author': self.author,
                'description': self.description,
                'title': self.title,
                'datetime': self.datetime,
                'filename': filename
            }

        return metadata

def compile_blogs(dir:str=BLOG_LOCATION):
    parser = BlogParser()
    output = []
    for html_filename in os.listdir(dir):
        print(f"parsing {html_filename}...", end=" ")
        html_filename = os.path.join(dir, html_filename)
        metadata = parser.get_blog_metadata(html_filename)
        output.append(metadata)
        print("done")

    output.sort(key=lambda x: x["datetime"], reverse=True)

    return output
        
def main():
    output = compile_blogs()                            # scrape metadata from html files
    output = json.dumps(output, indent=4)               # formatting
    output = "export const blog_metadata = " + output   # jank js object convert
    with open("./js/entries.js", "w") as file:          # write to file
        file.write(output)                              

if __name__ == "__main__":
    main()