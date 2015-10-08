# 2.0.0
- adds `force` option
- adds `recursive` option: note: before 2.0.0 it was always `true`, so make sure to add the -r flag when using 2.x.
- adds `src` `dest` as unnamed options, like: `assets-bundler  'node_modules/:module/public' 'public/assets/:module' -rf -e prod`
- adds `env` aliases: `dev` for `development`, `prod` for `production`


# 1.2.0
- adds `env` option


# 1.1.0
- changes default environment to `production`.


# ?.?.?
- missing a few bug fixes here.
- :-(), sorry.


# 1.0.0
- initial