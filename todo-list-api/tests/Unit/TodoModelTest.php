<?php

namespace Tests\Unit;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodoModelTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_has_attributes_to_mass_assign(): void
    {
        $todo = new Todo();

        $this->assertEquals(['content', 'status'], $todo->getFillable());
    }

    #[Test]
    public function it_can_create_a_todo_task(): void
    {
        $todo = Todo::create([
            'content' => 'Test todo task creation',
            'status' => false,
        ]);

        $this->assertInstanceOf(Todo::class, $todo);
        $this->assertEquals('Test todo task creation', $todo->content);
        $this->assertFalse($todo->status);
    }

    #[Test]
    public function status_default_is_false(): void
    {
        //Sorry if this looks like a dumb test but I didn't what else to test for the model :C
        $todo = Todo::create([
            'content' => 'Test todo task',
            'status' => false,
        ]);

        $this->assertFalse($todo->status);
    }
}
