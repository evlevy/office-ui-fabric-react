import { PartialTheme, Theme } from '../types';
import { teamsLightTheme } from '../themes';
import { mergeThemes } from './mergeThemes';

describe('mergeThemes', () => {
  it('performs a merge of themes', () => {
    // TODO: we should not use real themes in tests
    const a: Theme = teamsLightTheme;
    const b: PartialTheme = {
      brandColors: {
        primary: 'red',
      },
    };

    expect(mergeThemes(a, b).brandColors).toMatchInlineSnapshot(`
      Object {
        "primary": "red",
        "shade10": "#52558f",
        "shade20": "#494B83",
        "shade30": "#464775",
        "shade40": "#3D3E66",
        "shade50": "#393b5d",
        "shade60": "#323348",
        "tint10": "#8f95f8",
        "tint20": "#9EA2FF",
        "tint30": "#B2B5FF",
        "tint40": "#C7C9FF",
        "tint50": "#DBDCF0",
        "tint60": "#E9EAF6",
      }
    `);
  });
});
