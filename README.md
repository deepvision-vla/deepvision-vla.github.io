# DeepVision-VLA project page

Website for **Look Before Acting: Enhancing Vision Foundation Representations for Vision-Language-Action Models** (ACM Multimedia 2026).

- [Project page](https://deepvision-vla.github.io/)
- [Inference and evaluation code](https://github.com/yulin-luo/deepvision-vla)
- [RLBench-10 checkpoint](https://huggingface.co/lyl010221-pku/deepvision-vla-rlbench10)

## Local preview

From the repository root:

```sh
python -m http.server 8080
```

Open `http://localhost:8080/`. No build step or package installation is required.

## Editing

- `index.html`: project information, figures, demonstrations and citation.
- `static/css/site.css`: layout, typography and responsive styles.
- `static/js/site.js`: result charts, demonstration tabs, figure viewer and citation copying.
- `static/images/deepvision-mark.svg`: vector project mark; PNG and ICO versions provide browser icons.

The result charts and updated figures use the final camera-ready paper. The existing preprint PDF and media remain available at their original paths.

## Attribution

Originally adapted from the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) and [Nerfies](https://nerfies.github.io/). Website source is shared under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
