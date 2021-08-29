import { Controller, DynamicModule, Get, Module } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { MacchaPlugin } from "./MacchaPlugin";

@Controller({ path: "api/plugins" })
@ApiTags("Plugin Example")
@ApiResponse({ type: String })
class PluginExampleController {
    @Get()
    test() {
        return "Hello plugins !!!";
    }
}

@Module({})
class TestModule {
    static register(): DynamicModule {
        return {
            module: TestModule,
            imports: [],
            controllers: [PluginExampleController],
            providers: [],
            exports: [],
        };
    }
}

export const TestPlugin: MacchaPlugin = {
    migrations: [],
    modules: TestModule.register(),
    description: "テスト用のプラグインです",
    name: "テストプラグイン"
};

export * from "./MacchaPlugin";
